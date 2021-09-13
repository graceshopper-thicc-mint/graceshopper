import axios from 'axios'
import history from '../history'
import { parseJwt } from './cart'
import { localStorage } from './cart'
import store from "./"

const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH'

/**
 * ACTION CREATORS
 */
const setAuth = auth => ({type: SET_AUTH, auth})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token
      }
    })
    return dispatch(setAuth(res.data))
  }
}

async function loadGuestCartIntoDB(userId) {
  console.log('loadGuestCartIntoDB');
  let { data: invoice } = await axios.get(`/api/users/${userId}/invoice`);
  let { data: cartDb } = await axios.get(`/api/users/${userId}/cart`);
  
  //Make a map with only the gameIds from localStorage
  const mapOfGameIdsToQty = new Map(Object.entries(localStorage));
  mapOfGameIdsToQty.delete('token');
  
  //Get each game
  let gamesAwaiting = [];
  for(let [gameId, qty] of mapOfGameIdsToQty) {
    const { data: game } = await axios.get(`/api/games/${gameId}`);
    game.price = game.price/100;
    game.itemQuantity = parseInt(qty, 10);
    gamesAwaiting.push(game);
  }
  const gamesPromise = Promise.all(gamesAwaiting).then((game) => {
    return game;
  }).catch(err => {
    console.log(err)
  });
  let gamesAwaited = await gamesPromise;
  console.log('loadGuestCartIntoDB, gamesAwaited:', gamesAwaited);

  //Post or put each game to db
  gamesAwaited.forEach(async (game) => {
    const gameIdNotInCartDb = cartDb.map((invoiceLine) => invoiceLine.gameId).indexOf(game.id) === -1;
    if(invoice && gameIdNotInCartDb) {
      await axios.post(`/api/users/${userId}/cart`, {
        gameId: game.id,
        unitPrice: game.price * 100,
        invoiceId: invoice.id,
      });
      game.itemQuantity = 1;
    } else if(invoice) {
      let { data: invoiceLine } = await axios.get(`/api/users/${userId}/cart/${game.id}`);
      // game.itemQuantity = invoiceLine[0].itemQuantity + game.itemQuantity;
      await axios.put(`/api/users/${userId}/cart/${game.id}`, {
        itemQuantity: invoiceLine[0].itemQuantity + game.itemQuantity,
        unitPrice: invoiceLine[0].unitPrice + game.price * 100
      });
    }
  });
  
}

async function logInFetchCart(userId) {
  let { data: cartDb } = await axios.get(`/api/users/${userId}/cart`);
  
  const gamesAwaiting = cartDb.map(async (invoiceLine) => {
    let { data: gameToFetch } = await axios.get(`/api/games/${invoiceLine.gameId}`);
    gameToFetch.itemQuantity = invoiceLine.itemQuantity;
    gameToFetch.price = gameToFetch.price / 100;
    return gameToFetch;
  })
  const gamesPromise = Promise.all(gamesAwaiting).then((game) => {
    return game;
  }).catch(err => {
    console.log(err);
  });
  const gamesAwaited = await gamesPromise; //cartItems

  store.dispatch({
    type: "FETCH_CART",
    games: gamesAwaited, //games is an array of game objs
  });
}

export const authenticate = (info, method) => async dispatch => {
  try {
    console.log(info)
    const res = await axios.post(`/auth/${method}`, info)
    // Create invoice for user upon sign-up
    let userId = (parseJwt(res.data.token)).id
    window.localStorage.setItem(TOKEN, res.data.token)
    if(method === 'signup') {
      await axios.post(`/api/users/${userId}/invoice`, {
        userId: userId
      })
      dispatch(me());
    } else {
      dispatch(me());
      loadGuestCartIntoDB(userId);
      logInFetchCart(userId);
    }
  } catch (authError) {
    return dispatch(setAuth({error: authError}))
  }
}

export const logout = () => {
  localStorage.clear();
  store.dispatch({type: "CLEAR_CART"});
  history.push('/login')
  return {
    type: SET_AUTH,
    auth: {},
  }
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth
    default:
      return state
  }
}

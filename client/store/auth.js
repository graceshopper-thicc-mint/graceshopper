import axios from 'axios'
import history from '../history'
import { parseJwt } from './cart'
import { localStorage, fetchCart } from './cart'
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
    console.log('me, res.data', res.data);
    return dispatch(setAuth(res.data))
  }
}

async function logInFetchCart(userId) {
  console.log('logInFetchCart');
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

  console.log('logInFetchCart, store:', store.getState());
  store.dispatch({
    type: "FETCH_CART",
    games: gamesAwaited, //games is an array of game objs
  });
}

export const authenticate = (username, password, method) => async dispatch => {
  try {
    const res = await axios.post(`/auth/${method}`, {username, password})
    console.log('authenticate, post res:', res);
    // Create invoice for user upon sign-up
    let userId = (parseJwt(res.data.token)).id
    window.localStorage.setItem(TOKEN, res.data.token)
    if(method === 'signup') {
      await axios.post(`/api/users/${userId}/invoice`, {
        userId: userId
      })
      dispatch(me());
    } else {
      //call some other function that fetches cart then dispatch(me)
      logInFetchCart(userId);
      dispatch(me());
    }
  } catch (authError) {
    return dispatch(setAuth({error: authError}))
  }
}

export const logout = () => {
  localStorage.clear();
  //Empty the cart
  console.log('logout, store.dispatch', store.dispatch({type: "CLEAR_CART"}));
  console.log('Dispatched clearCart, store.getState:', store.getState());
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

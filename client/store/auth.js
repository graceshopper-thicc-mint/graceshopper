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
      logInFetchCart(userId);
      dispatch(me());
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

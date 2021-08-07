import axios from 'axios'
import history from '../history'
import { parseJwt } from './cart'

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

export const authenticate = (username, password, method) => async dispatch => {
  try {
    const res = await axios.post(`/auth/${method}`, {username, password})
    // Create invoice for user upon login
    window.localStorage.setItem(TOKEN, res.data.token)
    if(method === 'signup') {
      let userId = (parseJwt(res.data.token)).id
      await axios.post(`/api/users/${userId}/invoice`, {
        userId: userId
      })
    }
    dispatch(me())
  } catch (authError) {
    return dispatch(setAuth({error: authError}))
  }
}

export const logout = () => {
  //window.localStorage.removeItem(TOKEN)
  console.log('before clear: ', window.localStorage);
  window.localStorage.clear();
  console.log('after clear: ', window.localStorage);
  history.push('/login')
  return {
    type: SET_AUTH,
    auth: {}
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

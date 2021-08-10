import axios from 'axios'

const SET_USERS = 'SET_USERS';

const setUsers = (users) => {
  return {
    type: SET_USERS,
    users
  }
}

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/users/`)
      console.log(data);
      const action = setUsers(data);
      dispatch(action);
    } catch (error) {
      console.error(error);
    }
  }
}

export default function(state = [], action) {
  switch(action.type) {
    case SET_USERS:
      return action.users;
    default:
      return state;
  }
}

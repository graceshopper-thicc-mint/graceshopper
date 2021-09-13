import axios from 'axios'

const TOKEN = 'token';

const initialState = {
  allGames: [],
  singleGame: {},
};

/**
 * ACTION TYPES
 */
const SET_ALL_GAMES = 'SET_ALL_GAMES';
const SET_SINGLE_GAME = 'SET_SINGLE_GAME';
const UPDATE_SINGLE_GAME = 'UPDATE_SINGLE_GAME';
const DELETE_GAME = 'DELETE_GAME';
const CREATE_GAME = 'CREATE_GAME';

/**
 * ACTION CREATORS
 */
const setAllGames = (games) => {
  return {
    type: SET_ALL_GAMES,
    games
  };
};

export const setSingleGame = (game) => {
  return {
    type: SET_SINGLE_GAME,
    game
  }
}

const updateSingleGame = (game) => {
  return {
    type: UPDATE_SINGLE_GAME,
    game
  }
}

const _deleteGame = (game) => {
  return {
    type: DELETE_GAME,
    game
  }
}

const _createGame = (game) => {
  return {
    type: CREATE_GAME,
    game
  }
}

/**
 * THUNK CREATORS
 */
export const fetchAllGames = () => {
  return async (dispatch) => {
    const { data: games } = await axios.get('/api/games');
    // Convert game price from cents to dollars
    let editedGamesPrice = games.map((game) => {
      game.price = game.price/100;
      return game;
    });
    const action = setAllGames(editedGamesPrice);
    dispatch(action);
  }
}

export const fetchSingleGame = (gameId) => {
  return async (dispatch) => {
    const { data: game } = await axios.get(`/api/games/${gameId}`);
    const action = setSingleGame(game);
    dispatch(action);
  }
}

export const createGame = (game, history) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const{ data } = await axios.post('/api/games', game, {
        headers: {
          authorization: token
        }
      });
      const action = _createGame(data);
      dispatch(action);
      history.push(`/admin`);
    } catch (error) {
      console.error(error);
    }
  }
}

export const updateGame = (gameId, game, history) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data } = await axios.put(`/api/games/${gameId}`, game, {
        headers: {
          authorization: token
        }
      });
      const action = updateSingleGame(data);
      dispatch(action);
      history.push(`/admin/editGames`)
    } catch (error) {
      console.error(error);
    }
  }
}

export const deleteGame = (gameId, history) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data } = await axios.delete(`/api/games/${gameId}`, {headers: {
        authorization: token
      }});
      const action = _deleteGame(data);
      dispatch(action);
      history.push(`/admin/editGames`);
    } catch (error) {
      console.error(error);
    }
  }
}
/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_GAMES:
      return { ...state, allGames: action.games };
    case SET_SINGLE_GAME:
      return { ...state, singleGame: action.game };
    case CREATE_GAME:
      return {...state, allGames: [...state.allGames, action.game]}
    case UPDATE_SINGLE_GAME:
      return {...state, singleGame: action.game};
    case DELETE_GAME:
      return {...state, allGames: state.allGames.filter((game) =>
        game.id !== action.game.id
      )}
    default:
      return state;
  }
}

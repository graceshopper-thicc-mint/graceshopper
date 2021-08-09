import axios from 'axios'
import history from '../history'

const initialState = {
  allGames: [],
  singleGame: {},
};

/**
 * ACTION TYPES
 */
const SET_ALL_GAMES = 'SET_ALL_GAMES';
const SET_SINGLE_GAME = 'SET_SINGLE_GAME';

/**
 * ACTION CREATORS
 */
const setAllGames = (games) => {
  return {
    type: SET_ALL_GAMES,
    games
  };
};

const setSingleGame = (game) => {
  return {
    type: SET_SINGLE_GAME,
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

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_GAMES:
      return { ...state, allGames: action.games };
    case SET_SINGLE_GAME:
      return { ...state, singleGame: action.game };
    default:
      return state;
  }
}

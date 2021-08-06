import axios from 'axios';
import atob from 'atob';


const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

// Action Types
const FETCH_CART = "FETCH_CART";
const ADD_TO_CART = "ADD_TO_CART";
const ADJUST_ITEM_QTY = "ADJUST_ITEM_QTY";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const SAVE_CART = "SAVE_CART";

// Action Creators
const _fetchCart = (user) => {
  return {
    type: FETCH_CART,
    user
  }
}

const _addToCart = (game) => {
  return {
    type: ADD_TO_CART,
    game
  };
};

const _adjustItemQty = (game, qty) => {
  return {
    type: ADJUST_ITEM_QTY,
    game,
    qty
  };
};

const _removeFromCart = (game) => {
  return {
    type: REMOVE_FROM_CART,
    game
  };
};

// const _saveCart = () => {
//   return {
//     type: SAVE_CART,
    
//   };
// };

// Thunks
export const addToCart = (game, user) => { //params: game, user
  return async (dispatch) => {
    //Get user's cart /api/users/:userId/cart
    const userId = (parseJwt(window.localStorage.token)).id;
    console.log('addToCart, usedId:', userId);
    //Update the user's cart state with the new game
    dispatch(_addToCart(game));
    if(Object.prototype.hasOwnProperty.call(window.localStorage, 'token')) {
      await axios.post(`/api/users/${userId}/cart`, {
        userId: userId,
        gameId: game.id,
        itemQuantity: game.itemQuantity
      });
    }
    window.localStorage.setItem(game.id, game.itemQuantity);
  } 
}

export const adjustItemQty = (game, qty) => {
  return async (dispatch) => {
    //
    dispatch(_adjustItemQty(game, qty));
    window.localStorage.setItem(game.id, qty);
  }
}

export const removeFromCart = (game) => {
  return async (dispatch) => {
    dispatch(_removeFromCart(game));
  }
}

export const fetchCart = (user) => {
  return async (dispatch) => {
    if(user) {
      //Get the user's cart items
      await axios.get('')
    } else {
      const localStorage = window.localStorage;
      for(const key in localStorage) {
        if(key.length === 1) {
          const game = await axios.get(`/api/games/${key}`);
          dispatch(_addToCart(game));
        }
      }
    }
    
    /*
    1. Loop through window.localStorage
    2. In each iteration you would call the database using the gameId
    and get the game for that gameId...
    3. and Dispatch addToCart(game)
    */
  }
}
/*
if(Object.prototype.hasOwnProperty.call(window.localStorage, 'token')) {
        
}
*/
export const saveCart = (user, cart) => {
  return async (dispatch) => {
    //await axios
  }
}


const cartReducer = (state = [], action) => {
  switch(action.type) {
    case ADD_TO_CART: {
      const gameIds = state.map((game) => game.id);
      
      if(gameIds.indexOf(action.game.id) !== -1) {
        action.game.itemQuantity++;
        return [ ...state ];
      } else {
        action.game.itemQuantity = 1;
        return [ ...state, action.game ];
      }      
    }
    case ADJUST_ITEM_QTY: {
      action.game.itemQuantity = action.qty;
      return [ ...state ];
    }
    case REMOVE_FROM_CART: {
      const filteredGames = state.filter((game) => {
        return game.id !== action.game.id;
      });

      return [ ...filteredGames ];
    }
    case SAVE_CART: {
      

      return [ ...state ];
    }
    default:
      return state;
  }
};

export default cartReducer;
import axios from 'axios';

// Action Types
const ADD_TO_CART = "ADD_TO_CART";
const ADJUST_ITEM_QTY = "ADJUST_ITEM_QTY";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const SAVE_CART = "SAVE_CART";

// Action Creators
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

    console.log('addToCart thunk:', game);
    //Update the user's cart state with the new game
    dispatch(_addToCart(game));
  } 
}

export const adjustItemQty = (game, qty) => {
  return async (dispatch) => {
    dispatch(_adjustItemQty(game, qty));
  }
}

export const removeFromCart = (game) => {
  return async (dispatch) => {
    dispatch(_removeFromCart(game));
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
    case REMOVE_FROM_CART:
      return [ ...state, state.filter((game) => (
        game.id !== action.game.id
      ))];
    case SAVE_CART: {
      

      return [ ...state ];
    }
    default:
      return state;
  }
};

export default cartReducer;
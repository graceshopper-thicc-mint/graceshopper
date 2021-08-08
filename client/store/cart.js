import axios from 'axios';
import atob from 'atob';

export const localStorage = window.localStorage;

export const parseJwt = (token) => {
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

// Thunks
export const addToCart = (game, user) => { //params: game, user
  return async (dispatch) => {
    //console.log('addToCart, usedId:', userId);
    //Update the user's cart state with the new game
    dispatch(_addToCart(game));
    if(Object.prototype.hasOwnProperty.call(localStorage, 'token')) {
      const userId = (parseJwt(localStorage.token)).id;
      console.log(userId)
      let { data: invoice } = await axios.get(`/api/users/${userId}/invoice`);
      await axios.post(`/api/users/${userId}/cart`, {
        gameId: game.id,
        itemQuantity: game.itemQuantity,
        unitPrice: game.price*100,
        invoiceId: invoice.id,
      });
    }
    localStorage.setItem(game.id, game.itemQuantity);
  }
}

export const adjustItemQty = (game, qty) => {
  return async (dispatch) => {
    //
    dispatch(_adjustItemQty(game, qty));
    localStorage.setItem(game.id, qty);
  }
}

export const removeFromCart = (game) => {
  return async (dispatch) => {
    dispatch(_removeFromCart(game));
    localStorage.removeItem(game.id);
  }
}

export const fetchCart = () => {
  return async (dispatch) => {
    if(Object.prototype.hasOwnProperty.call(localStorage, 'token')) {

      //Get the user's cart items
      const userId = (parseJwt(localStorage.token)).id;
      let cartItems = await axios.get(`/api/users/${userId}/cart`)
    }
    // If logged in, append guest cart to user's cart
    // If not logged in, display guest cart
    /*
    1. Loop through window.localStorage
    2. In each iteration you would call the database using the gameId
    and get the game for that gameId...
    3. and Dispatch addToCart(game)
    */

    for(const key in localStorage) {
      if(key.length === 1) {
        const { data } = await axios.get(`/api/games/${key}`);
        let game = data;
        game.price = game.price/100;
        dispatch(_addToCart(game));
      }
    }
  }
}

// Add in datePurchased and confirmationNumer
export const updateCartInvoice = (confirmationNumber, datePurchased) => {
  return async (dispatch) => {
    try {
      const userId = (parseJwt(localStorage.token)).id;
      const { data } = await axios.get(`/api/users/${userId}/invoice`)
      await axios.put(`/api/users/${userId}/${data.id}`, {
        confirmationNumber: confirmationNumber,
        datePurchased: datePurchased
      })
    } catch (error) {
      console.log(error)
    }
  }
}

// Assign a new cart for a user after their purchases
export const createNewCart = () => {
  return async (dispatch) => {
    try {
      const userId = (parseJwt(localStorage.token)).id
      await axios.post(`/api/users/${userId}/invoice`, {
        userId: userId
      })
    } catch (error) {
      console.log(error)
    }
  }
}

/* Fetch a user's purchase history
export const getOrders = () => {
  return async (dispatch) => {
    try {
      const userId = (parseJwt(localStorage.token)).id
      const { data } = await axios.get(`/api/users/${userId}/purchases`)
      return data[0]
    } catch (error) {
      console.log(error)
    }
  }
}*/

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
    default:
      return state;
  }
};

export default cartReducer;

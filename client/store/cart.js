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
const _fetchCart = (game) => {
  return {
    type: FETCH_CART,
    game
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
export const addToCart = (game) => { //params: game, user
  console.log('game inside addToCart:', game);
  return async (dispatch) => {
    //Update the user's cart state with the new game
    dispatch(_addToCart(game));
    if(Object.prototype.hasOwnProperty.call(localStorage, 'token')) {
      const userId = (parseJwt(localStorage.token)).id;
      let { data: invoice } = await axios.get(`/api/users/${userId}/invoice`);
      let { data: cartDb } = await axios.get(`/api/users/${userId}/cart`);
      if(invoice && cartDb.map((item) => item.gameId).indexOf(game.id) === -1) {
        await axios.post(`/api/users/${userId}/cart`, {
          gameId: game.id,
          itemQuantity: game.itemQuantity,
          unitPrice: game.price * 100,
          invoiceId: invoice.id,
        });
      }
      else if(invoice) {
        let { data: invoiceLine } = await axios.get(`/api/users/${userId}/cart/${game.id}`);
        await axios.put(`/api/users/${userId}/cart/${game.id}`, {
          itemQuantity: invoiceLine[0].itemQuantity + 1,
          unitPrice: invoiceLine[0].unitPrice + game.price * 100
        });
      }
    }
  }
}

export const adjustItemQty = (game, qty) => {
  return async (dispatch) => {
    if(Object.prototype.hasOwnProperty.call(localStorage, 'token')) {
      const userId = (parseJwt(localStorage.token)).id;
      await axios.put(`/api/users/${userId}/cart/${game.id}`, {
        itemQuantity: qty
      });
    }
    else {
      localStorage.setItem(game.id, qty);
    }
    dispatch(_adjustItemQty(game, qty));
  }
}

export const removeFromCart = (game) => {
  return async (dispatch) => {
    if(Object.prototype.hasOwnProperty.call(localStorage, 'token')) {
      const userId = (parseJwt(localStorage.token)).id;
      await axios.delete(`/api/users/${userId}/cart/${game.id}`);
    }
    else {
      localStorage.removeItem(game.id);
    }
    dispatch(_removeFromCart(game));
  }
}

export const fetchCart = () => {
  return async (dispatch) => {
    // Fetch user cart on refresh
    if(Object.prototype.hasOwnProperty.call(localStorage, 'token')) {
      const userId = (parseJwt(localStorage.token)).id;
      let { data: cartDb } = await axios.get(`/api/users/${userId}/cart`);
      console.log('this is cartDb inside fetchCart: ', cartDb);
      cartDb.forEach(async (game) => {
        let { data: gameToFetch } = await axios.get(`/api/games/${game.gameId}`);
        gameToFetch.itemQuantity = game.itemQuantity;
        dispatch(_fetchCart(gameToFetch));
      });
    }

    // Append user cart to guest cart stored in local storage if it exists
    for(const key in localStorage) {
      if(key.length === 1) {
        const { data: game } = await axios.get(`/api/games/${key}`);
        dispatch(_fetchCart(game));
      }
    }

    //Get the user's cart items
      // const userId = (parseJwt(localStorage.token)).id;
      // let { data: cartItems } = await axios.get(`/api/users/${userId}/cart`);
      // cartItems.forEach(async (game) => {
      //   const { data: fetchedGame } = await axios.get(`/api/games/${game.gameId}`);
      //   fetchedGame.price = fetchedGame.price/100;
      //   if(Number(localStorage[game.id])) {
      //     fetchedGame.itemQuantity = Number(localStorage[game.id]);
      //   }
      //   dispatch(_fetchCart(fetchedGame));
      // });

    // Guest cart
    // console.log('inside fetchCart thunk: ');
    // for(const key in localStorage) {
    //   if(key.length === 1) {
    //     const { data: game } = await axios.get(`/api/games/${key}`);
    //     game.price = game.price/100;
    //     dispatch(_fetchCart(game));
    //   }
    // }
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
      const gameIdSet = new Set(state.map((game) => game.id));

      if(gameIdSet.has(action.game.id)) {
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
    case FETCH_CART: {
<<<<<<< HEAD


      // const gameIdSet = new Set(state.map((game) => game.id));

      // if(gameIdSet.has(action.game.id)) {
      //   action.game.itemQuantity++;
      //   return [ ...state ];
      // } else {
      //   action.game.itemQuantity = 1;
      // }
      // return [ ...state, action.game ];
=======
      if(localStorage.getItem(action.game.id)) {
        action.game.itemQuantity = Number(localStorage.getItem(action.game.id));
      }
      else {
        action.game.isFetched = true;
      }
      action.game.price = action.game.price / 100;
      return [ ...state, action.game ];
>>>>>>> 22fa18853d34ed972746274a0d929e28ed43078e
    }
    case SAVE_CART: {
      

      return [ ...state ];
    }
    default:
      return state;
  }
};

export default cartReducer;

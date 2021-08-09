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
  return async (dispatch) => {
    //console.log('addToCart, usedId:', userId);
    //Update the user's cart state with the new game
    dispatch(_addToCart(game));
    if(Object.prototype.hasOwnProperty.call(localStorage, 'token')) {
      const userId = (parseJwt(localStorage.token)).id;
      console.log(userId)
      let { data: invoice } = await axios.get(`/api/users/${userId}/invoice`);
      if(!Number(localStorage[game.id]) && invoice) {
        localStorage.setItem(game.id, game.itemQuantity);
        await axios.post(`/api/users/${userId}/cart`, {
          gameId: game.id,
          itemQuantity: game.itemQuantity,
          unitPrice: game.price * 100,
          invoiceId: invoice.id,
        });
      }
      else if(Number(localStorage[game.id]) >= 1 && invoice) {
        let { data: invoiceLine } = await axios.get(`/api/users/${userId}/cart/${game.id}`);
        // console.log('invoiceLine in addToCart: ', invoiceLine[0]);
        localStorage.setItem(game.id, Number(localStorage.getItem(game.id)) + 1);
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
    
    dispatch(_adjustItemQty(game, qty));
    localStorage.setItem(game.id, qty);
  }
}

export const removeFromCart = (game) => {
  return async (dispatch) => {
    if(Object.prototype.hasOwnProperty.call(localStorage, 'token')) {
      const userId = (parseJwt(localStorage.token)).id;
      await axios.delete(`/api/users/${userId}/cart/${game.id}`);
    }
    
    dispatch(_removeFromCart(game));
    localStorage.removeItem(game.id);
  }
}

export const fetchCart = () => {
  return async (dispatch) => {
    if(Object.prototype.hasOwnProperty.call(localStorage, 'token')) {
      //Get each individual game obj from db and adjust game obj
      const userId = (parseJwt(localStorage.token)).id;
      let { data: cartItems } = await axios.get(`/api/users/${userId}/cart`);
      cartItems.forEach(async (game) => {
        console.log('fetchCart, cartItems.forEach');
        const { data: fetchedGame } = await axios.get(`/api/games/${game.gameId}`);
        fetchedGame.price = fetchedGame.price/100;
        if(Number(localStorage[game.id])) {
          fetchedGame.itemQuantity = Number(localStorage[game.id]);
        }
        dispatch(_fetchCart(fetchedGame));
      });

      //When page refreshes or loads, show current cart qtys from localStorage
      const cartItemDivs = document.querySelectorAll('#game-qty');
      for(let i = 0; i < cartItemDivs.length; i++) {
        const gameId = cartItemDivs[0].dataset["gameId"];
        const gameQty = localStorage.getItem(gameId)
        cartItemDivs[i].querySelector('#game-qty').value = gameQty; 
      }

    } else {
      // Guest cart
      console.log('inside fetchCart thunk:');
      for(const key in localStorage) {
        if(key.length === 1) {
          const { data: game } = await axios.get(`/api/games/${key}`);
          game.price = game.price/100;
          dispatch(_fetchCart(game));
        }
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


      // const gameIdSet = new Set(state.map((game) => game.id));

      // if(gameIdSet.has(action.game.id)) {
      //   action.game.itemQuantity++;
      //   return [ ...state ];
      // } else {
      //   action.game.itemQuantity = 1;
      // }
      // return [ ...state, action.game ];
    }
    case SAVE_CART: {
      

      return [ ...state ];
    }
    default:
      return state;
  }
};

export default cartReducer;

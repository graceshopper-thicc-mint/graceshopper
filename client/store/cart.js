
const initialState =  [
  {
    name: "Totally Accurate Battlegrounds",
    price: 0,
    genre: "Indie",
    maturityRating: "E",
    publisher: "Landfall",
    imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/823130/header.jpg?t=1620818743",
    description: "Battle Royal like you've never seen it before. Start the match skydiving face-first into a building and end the game by beating your opponents in a guns-blazing game of the floor is lava.",
    releaseDate: '2018-06-05'
  },
  {
    name: "Grounded",
    price: 29.99,
    genre: "Survival",
    maturityRating: "E",
    publisher: "Xbox Game Studios",
    imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/962130/header.jpg?t=1627580479",
    platform: "PC, Xbox",
    description: "The world is a vast, beautiful and dangerous place – especially when you have been shrunk to the size of an ant. Explore, build and survive together in this first person, multiplayer, survival-adventure. Can you thrive alongside the hordes of giant insects, fighting to survive the perils of the backyard?",
    releaseDate: '2020-07-28'
  },
  {
    name: "Hades",
    price: 24.99,
    genre: "Roguelike",
    maturityRating: "E", 
    publisher: "Supergiant Games",
    imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1145360/header.jpg?t=1624463563",
    platform: "PC, PS4, PS5, Xbox",
    description: "Hades is a god-like rogue-like dungeon crawler that combines the best aspects of Supergiant's critically acclaimed titles, including the fast-paced action of Bastion, the rich atmosphere and depth of Transistor, and the character-driven storytelling of Pyre.",
    releaseDate: '2020-09-17'
  },
],


// Action Types
const ADD_TO_CART = "ADD_TO_CART";
const ADJUST_ITEM_QTY = "ADJUST_ITEM_QTY";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const LOAD_CURRENT_ITEM = "LOAD_CURRENT_ITEM";

// Action Creators
const addToCart = (itemId) => {
  return {
    type: ADD_TO_CART,
    itemId
  };
};

const adjustItemQty = (itemId, qty) => {
  return {
    type: ADJUST_ITEM_QTY,
    payload: {
      itemId,
      qty
    }
  };
};

const removeFromCart = (itemId) => {
  return {
    type: REMOVE_FROM_CART,
    itemId
  };
};

const loadCurrentItem = (item) => {
  return {
    type: LOAD_CURRENT_ITEM,
    item
  };
};

// Thunks


const cartReducer = (state = initialState, action) {
  switch(action) {
    case ADD_TO_CART:
      return [ ...state, action.itemId ];
    case ADJUST_ITEM_QTY:
      return [];
    case REMOVE_FROM_CART:
      return [];
    case LOAD_CURRENT_ITEM:
      return [];
    default:
      return state;
  }
};

export default cartReducer;
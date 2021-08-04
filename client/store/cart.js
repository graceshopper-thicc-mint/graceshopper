
const initialState =  [
  {
    id: 1,
    name: "Totally Accurate Battlegrounds",
    price: 0,
    genre: "Indie",
    maturityRating: "E",
    publisher: "Landfall",
    imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/823130/header.jpg?t=1620818743",
    description: "Battle Royal like you've never seen it before. Start the match skydiving face-first into a building and end the game by beating your opponents in a guns-blazing game of the floor is lava.",
    releaseDate: '2018-06-05',
    itemQuantity: 1
  },
  {
    id: 2,
    name: "Grounded",
    price: 29.99,
    genre: "Survival",
    maturityRating: "E",
    publisher: "Xbox Game Studios",
    imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/962130/header.jpg?t=1627580479",
    platform: "PC, Xbox",
    description: "The world is a vast, beautiful and dangerous place – especially when you have been shrunk to the size of an ant. Explore, build and survive together in this first person, multiplayer, survival-adventure. Can you thrive alongside the hordes of giant insects, fighting to survive the perils of the backyard?",
    releaseDate: '2020-07-28',
    itemQuantity: 1
  },
  {
    id: 3,
    name: "Hades",
    price: 24.99,
    genre: "Roguelike",
    maturityRating: "E", 
    publisher: "Supergiant Games",
    imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1145360/header.jpg?t=1624463563",
    platform: "PC, PS4, PS5, Xbox",
    description: "Hades is a god-like rogue-like dungeon crawler that combines the best aspects of Supergiant's critically acclaimed titles, including the fast-paced action of Bastion, the rich atmosphere and depth of Transistor, and the character-driven storytelling of Pyre.",
    releaseDate: '2020-09-17',
    itemQuantity: 1
  },
]

const gameToAdd = {
    id: 4,
    name: "The Outer Worlds",
    price: 59.99,
    genre: "Action, RPG",
    maturityRating: "M",
    publisher: "Private Division",
    imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/578650/header.jpg?t=1616004214",
    platform: "PS4, Xbox, Nintendo Switch, PC",
    description: "Lost in transit while on a colonist ship bound for the furthest edge of the galaxy, you awake decades later only to find yourself in the midst of a deep conspiracy threatening to destroy the Halcyon colony. As you explore the furthest reaches of space and encounter various factions, all vying for power, the character you decide to become will determine how this player-driven story unfolds. In the corporate equation for the colony, you are the unplanned variable.",
    releaseDate: '2020-10-23',
    itemQuantity: 1
}

const gameThatExists = {
    id: 2,
    name: "Grounded",
    price: 29.99,
    genre: "Survival",
    maturityRating: "E",
    publisher: "Xbox Game Studios",
    imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/962130/header.jpg?t=1627580479",
    platform: "PC, Xbox",
    description: "The world is a vast, beautiful and dangerous place – especially when you have been shrunk to the size of an ant. Explore, build and survive together in this first person, multiplayer, survival-adventure. Can you thrive alongside the hordes of giant insects, fighting to survive the perils of the backyard?",
    releaseDate: '2020-07-28',
    itemQuantity: 1
}


// Action Types
const ADD_TO_CART = "ADD_TO_CART";
const ADJUST_ITEM_QTY = "ADJUST_ITEM_QTY";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const LOAD_CURRENT_ITEM = "LOAD_CURRENT_ITEM";

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

const _loadCurrentItem = (game) => {
  return {
    type: LOAD_CURRENT_ITEM,
    game
  };
};

// Thunks
export const addToCart = (game, user) => { //params: game, user
  return async (dispatch) => {
    //Get user's cart /api/users/:userId/cart

    //Update the user's cart state with the new game
    dispatch(_addToCart(gameToAdd));
  } 
}

export const adjustItemQty = (game, qty) => {
  return async (dispatch) => {
    dispatch(_adjustItemQty(game, qty));
  }
}


const cartReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_TO_CART: {
      const gameIds = state.map((game) => {
        return game.id;
      });
      
      if(gameIds.indexOf(action.game.id) !== -1) {
        action.game.itemQuantity++;
        return [ ...state ];
      } else {
        return [ ...state, action.game ];
      }      
    }
    case ADJUST_ITEM_QTY: {
      action.game.itemQuantity - action.qty;
      return [ ...state ];
    }
    case REMOVE_FROM_CART:
      return [];
    case LOAD_CURRENT_ITEM:
      return [];
    default:
      return state;
  }
};

export default cartReducer;
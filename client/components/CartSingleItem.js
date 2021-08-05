import React, { useState } from 'react';
import { connect } from 'react-redux';
import { adjustItemQty } from '../store/cart';

const CartSingleItem = ({ game, adjustItemQty, removeFromCart }) => {
  const [qty, setQty] = useState(game.itemQuantity);

  function handleChange(event) {
    // console.log('handleChange, game:', game, ' event:', event);
    //Adjust cart state's quantity
    setQty(event.target.value);
    adjustItemQty(game, event.target.value);
    // event.target.name //new value after increment
    
  }

  return (
    <div key={game.id} className="in-cart-game">
      <p>{game.name}</p>
      <p>{game.price}</p>
      <form>
        <input type="number" id="game-qty" name="game-qty" min="0" value={qty} onChange={handleChange} />
      </form>
      <button onClick={() => removeFromCart(game)}><i className="fa fa-trash" aria-hidden="true"></i></button>
      <div>
        <img className="in-cart-game-img" src={game.imageUrl} />
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    adjustItemQty: (game, qty) => dispatch(adjustItemQty(game, qty)),
    removeFromCart: (game) => dispatch(removeFromCart(game)),
  }
}

export default connect(null, mapDispatchToProps)(CartSingleItem);


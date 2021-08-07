import React, { useState } from 'react';
import { connect } from 'react-redux';
import { adjustItemQty, removeFromCart } from '../store/cart';
import { localStorage } from '../store/cart';

const CartSingleItem = ({ game, adjustItemQty, removeFromCart }) => {
  const [qty, setQty] = useState(game.itemQuantity);

  function handleChange(event) {
    const itemQty = parseInt(event.target.value, 10);
    setQty(itemQty);
    adjustItemQty(game, itemQty);    
  }

  return (
    <div key={game.id} className="in-cart-game">
      <p>{game.name}</p>
      <p>$ {game.price}</p>
      <form>
        <input type="number" id="game-qty" name="game-qty" min="1" value={
          localStorage.getItem(game.id) ? localStorage.getItem(game.id) : qty
        } onChange={handleChange} />
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


import React, { useState } from 'react';
import { connect } from 'react-redux';
import { adjustItemQty } from '../store/cart';

const CartSingleItem = ({ game }) => {
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
      <div>
        <img className="in-cart-game-img" src={game.imageUrl} />
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {

}

export default connect(null, mapDispatchToProps)(CartSingleItem);


import React, { useState } from 'react';
import { connect } from 'react-redux';
import { adjustItemQty, removeFromCart } from '../store/cart';
import { localStorage } from '../store/cart';

const CartSingleItem = ({ game, adjustItemQty, removeFromCart }) => {
  const [qty, setQty] = useState(game.itemQuantity);
  console.log('game.itemQuantity:', game.itemQuantity);
  // Similar to componentDidMount and componentDidUpdate:
  // useEffect(() => {
  //   document.querySelectorAll
  // });





  function handleChange(event) {
    // console.log('At handleChange, event.target.value:', event.target.value);
    const itemQty = parseInt(event.target.value, 10);
    console.log('At handleChange, qty before setQty:', qty);
    console.log('itemQty:', itemQty);
    setQty(itemQty);
    console.log('At handleChange, qty after setQty:', qty);
    adjustItemQty(game, itemQty);    
  }

  // const qtyValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div key={game.id} className="in-cart-game">
      <p>{game.name}</p>
      <p>$ {game.price}</p>
      <label htmlFor="game-qty">Quantity:</label>
      <select name="qty" id="game-qty" value={qty} onChange={handleChange} >
      <option key="1" className="update-qty" value="1">1</option>
      <option key="2" className="update-qty" value="2">2</option>
      <option key="3" className="update-qty" value="3">3</option>
      <option key="4" className="update-qty" value="4">4</option>
      <option key="5" className="update-qty" value="5">5</option>
      <option key="6" className="update-qty" value="6">6</option>
      <option key="7" className="update-qty" value="7">7</option>
      <option key="8" className="update-qty" value="8">8</option>
      <option key="9" className="update-qty" value="9">9</option>
      <option key="10" className="update-qty" value="10">10</option>
        {/* {qtyValues.map((qty) => {
          return (
            <option key={qty} className="update-qty" value={qty}>{qty}</option>
          )
        })} */}
      </select>
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


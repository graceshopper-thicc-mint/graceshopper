import React from 'react';
import { connect } from 'react-redux';

const Cart = ({ cart }) => {
  console.log("At Cart:", cart);

  return (
    <div>
      <h3>Cart</h3>
      {cart.map((game) => {
        return (
        <div key={game.id} className="in-cart-game">
          <p>{game.name}</p>
          <p>{game.price}</p>
          <div>
            <img className="in-cart-game-img" src={game.imageUrl} />
          </div>
        </div>
        );
      })}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addToCart: () => dispatch(addToCart),
//   }
// }

export default connect(mapStateToProps)(Cart);
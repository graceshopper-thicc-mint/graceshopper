import React from 'react';
import { connect } from 'react-redux';
import CartSingleItem from './CartSingleItem';

const Cart = ({ cart, adjustItemQty}) => {
  console.log("At Cart, this.props:");

  

  return (
    <div>
      <h3>Cart</h3>
      {cart.map((game) => {
        return (
          <CartSingleItem key={game.id} game={game} /> 
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

const mapDispatchToProps = (dispatch) => {
  return {
    adjustItemQty: (game, qty) => dispatch(adjustItemQty(game, qty)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
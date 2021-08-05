import { getConfirmation } from 'history/DOMUtils';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import CartSingleItem from './CartSingleItem';

const Cart = ({ cart }) => {
  console.log("At Cart, this.props:", cart);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalGames, setTotalGames] = useState(0);

  useEffect(() => {
    let games = 0;
    let price = 0;
    cart.forEach((game) => {
      games += game.qty;
      price += game.qty * game.price;
    });

    setTotalGames(games);
    setTotalPrice(price);
  }, [cart, totalPrice, totalGames, setTotalPrice, setTotalGames]);

  const setCart = (cart) => {
    window.localStorage.setItem('cart', JSON.stringify(cart));
  }

  const getCart = (cart) => {
    if(cart.length > 0) {
      cart = JSON.parse(window.localStorage.getItem('cart'));
    }
  }

  return (
    <div>
      <h3>Cart</h3>
      <div>
        {getCart()}
        {cart.map((game) => {
          return (
            <CartSingleItem key={game.id} game={game} /> 
          );
        })}
        {setCart(cart)}
      </div>
      <div>
        <h4>Cart Summary</h4>
        <p>Total Games: {totalGames} games</p>
        <p>Total Price: $ {totalPrice}</p>
      </div>
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
//   }
// }

export default connect(mapStateToProps, null)(Cart);
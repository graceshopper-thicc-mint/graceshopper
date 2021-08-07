import { getConfirmation } from 'history/DOMUtils';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import CartSingleItem from './CartSingleItem';
import { fetchCart } from '../store/cart';

const Cart = ({ cart, fetchCart }) => {
  // this.state
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalGames, setTotalGames] = useState(0);

  // ComponentDidMount
  useEffect(() => {
    fetchCart();
  }, []);

  // If you want to use ComponentDidUnmount, make an explicit
  // return within useEffect with a non-empty array component
  
  // ComponentDidUpdate and this.setState
  useEffect(() => {
    // console.log('cart before: ', cart);
    // console.log('cart after: ', cart);
    let games = 0;
    let price = 0;
    cart.forEach((game) => {
      games += game.itemQuantity;
      price += game.itemQuantity * game.price;
    });

    // for(let key in localStorage) {
    //   if(key !== 'token') {
    //     games += localStorage[key];
    //   }
    // }

    // cart.forEach((game) => {
    //   return price += game.      
    // })

    setTotalGames(games);
    price = price.toFixed(2); //price is now a string
    setTotalPrice(price);
  }, [cart, totalPrice, totalGames, setTotalPrice, setTotalGames]);

  const round = (value, decimal) => {
    return Number(Math.round(value + 'e' + decimal) + 'e-' + decimal);
  }

  // what happens when you click checkout
  function handleClick (e) {

  }

  return (
    <div>
      <h3>Cart</h3>
      <div>
        {cart.map((game) => {
          return (
            <CartSingleItem key={game.id} game={game} />
          );
        })}
      </div>
      <div>
        <h4>Cart Summary</h4>
        <p>Total Games: {totalGames} games</p>
        <p>Total Price: $ {totalPrice}</p>
        <button type="submit" onClick={handleClick} value={cart}>Checkout</button>
      </div>
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
    fetchCart: () => dispatch(fetchCart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

import { getConfirmation } from 'history/DOMUtils';
import { Redirect } from "react-router-dom"
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import CartSingleItem from './CartSingleItem';
import OrderConfirmation from "./OrderConfirmation"
import { fetchCart, updateCartInvoice, createNewCart } from '../store/cart';

const Cart = ({ cart, fetchCart, updateCartInvoice, createNewCart }) => {
  // this.state
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalGames, setTotalGames] = useState(0);

  // ComponentDidUpdate and this.setState
  useEffect(() => {
    let games = 0;
    let price = 0;

    cart.forEach((game) => {
      games += game.itemQuantity;
      price += game.itemQuantity * game.price;
    });

    setTotalGames(games);
    price = Number(price.toFixed(2)); // price is 2 decimals and now a number
    setTotalPrice(price);
  }, [cart, totalPrice, totalGames, setTotalPrice, setTotalGames]);

  // const round = (value, decimal) => {
  //   return Number(Math.round(value + 'e' + decimal) + 'e-' + decimal);
  // }

  // what happens when you click checkout
  // i want to create a order confirmation #, DONE
  // save datepurchased as the time when clicked, DONE
  // save all that to the database (update) DONE
  // since we now have a datepurchased, we dont render that cart out anymore NEEDS WORK
  // create a new invoice for the user,
  // fetch that orderconfirmation number with the invoice id, I guess?
  // render out the orderconfirmation page
   function handleCheckout() {
    const orderConfirmationNumber = Math.floor(Math.random() * 10000000)
    const datePurchased = Date.now()
    updateCartInvoice(orderConfirmationNumber, datePurchased)
    for (let key in localStorage) {
      if (key !== "token") {
        localStorage.removeItem(key)
      }
    }
    createNewCart()
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
        <button type="submit" onClick={() => handleCheckout()}>Checkout</button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    userId: state.auth.id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCart: () => dispatch(fetchCart()),
    updateCartInvoice: (orderConfirmationNumber, datePurchased) => dispatch(updateCartInvoice(orderConfirmationNumber, datePurchased)),
    createNewCart: () => dispatch(createNewCart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

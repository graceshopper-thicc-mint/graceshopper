import { getConfirmation } from 'history/DOMUtils';
import { Redirect, Link, useHistory } from "react-router-dom"
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import CartSingleItem from './CartSingleItem';
import OrderConfirmation from "./OrderConfirmation"
import axios from "axios"
import { fetchCart, updateCartInvoice, createNewCart } from '../store/cart';

const Cart = ({ cart, fetchCart, updateCartInvoice, createNewCart, userId }) => {
  let history = useHistory()
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
    //console.log('cart before: ', cart);
    //console.log('cart after: ', cart);
    let games = 0;
    let price = 0;
    cart.forEach((game) => {
      games += game.itemQuantity;
      price += game.itemQuantity * game.price;
    });

    setTotalGames(games);
    price = price.toFixed(2); //price is now a string
    setTotalPrice(price);
  }, [cart, totalPrice, totalGames, setTotalPrice, setTotalGames]);

  const round = (value, decimal) => {
    return Number(Math.round(value + 'e' + decimal) + 'e-' + decimal);
  }

  // what happens when you click checkout
  // i want to create a order confirmation #, DONE
  // save datepurchased as the time when clicked, DONE
  // save all that to the database (update) DONE
  // since we now have a datepurchased, we dont render that cart out anymore NEEDS WORK
  // create a new invoice for the user DONE
  // fetch that orderconfirmation number with the invoice id, I guess?
  // render out the orderconfirmation page
   async function handleCheckout() {
    const orderConfirmationNumber = Math.floor(Math.random() * 10000000)
    const datePurchased = Date.now()
    if (!localStorage.token) {
      const { data } = await axios.post("/api/guests/invoice", {
        confirmationNumber: orderConfirmationNumber,
        datePurchased
      })
      const confirmationNumber = data.confirmationNumber
      //history.push({
      // pathname: `/users/${userId}/confirmation`
      //})

    } else {
      await updateCartInvoice(orderConfirmationNumber, datePurchased)
      for (let key in localStorage) {
        if (key !== "token") {
          localStorage.removeItem(key)
        }
      }
      await createNewCart()
      history.push({
        pathname: `/users/${userId}/confirmation`
      })
      }
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
        <button type="submit" onClick={() => handleCheckout()}>
          Checkout
        </button>
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

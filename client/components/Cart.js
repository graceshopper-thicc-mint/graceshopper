import { getConfirmation } from "history/DOMUtils";
import { Redirect, Link, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import CartSingleItem from "./CartSingleItem";
import OrderConfirmation from "./OrderConfirmation";
import axios from "axios";
import { fetchCart, updateCartInvoice, createNewCart } from "../store/cart";


const Cart = ({ cart, fetchCart, updateCartInvoice, createNewCart, userId }) => {
  let history = useHistory()

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

 async function handleCheckout() {
    try {
      const orderConfNumber = Math.floor(Math.random() * 10000000);
      const datePurchased = Date.now();

      // for guests
      if (!localStorage.token) {
        const { data } = await axios.post("/api/guests/invoice", {
          confirmationNumber: orderConfNumber,
          datePurchased,
        });
        const { confirmationNumber } = data
        history.push({
          pathname: `/confirmation`,
          state: { confirmationNumber },
        });
      } // for logged-in users
        else {
        await updateCartInvoice(orderConfNumber, datePurchased);
        for (let key in localStorage) {
          if (key !== "token") {
            localStorage.removeItem(key);
          }
        }
        await createNewCart();
        await fetchCart()
        history.push({
          pathname: `/users/${userId}/confirmation`,
        });
      }
    } catch (error) {
      console.log(error)
    }

  }

  if (cart.length > 0) {
    return (
      <div id="cart-container">
        <div id="cart-games">
          <h3 id="how-many-items">{totalGames} item(s) in your cart</h3>
          <div id="cart-game">
            {cart.map((game) => {
              return <CartSingleItem key={game.id} game={game} />;
            })}
          </div>
        </div>
        <div id="cart-summary">
          <p id="cart-summary-title">Cart Summary</p>
          <p>{totalGames} game(s)</p>
          <p>Total Price: $ {totalPrice}</p>
          <button type="submit" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
    )
  } else {
    return (
      <div id="empty-cart">
        <h1>Your cart is empty.</h1>
        <img src="sad-face.png" />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    userId: state.auth.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCart: () => dispatch(fetchCart()),
    updateCartInvoice: (orderConfirmationNumber, datePurchased) =>
      dispatch(updateCartInvoice(orderConfirmationNumber, datePurchased)),
    createNewCart: () => dispatch(createNewCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

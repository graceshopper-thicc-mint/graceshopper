import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { fetchCart, localStorage } from "../store/cart";

const Navbar = ({ handleClick, isLoggedIn, isAdmin, cart, fetchCart }) => {
  let [totalGames, setTotalGames] = useState(0);

  useEffect(() => {
    console.log("inside navbar mount: ");
    fetchCart();
  }, []);

  useEffect(() => {
    let total = 0;

    cart.forEach((game) => {
      total += game.itemQuantity;
    });
    setTotalGames(total);
  }, [cart, totalGames, setTotalGames]);

  function handleCart() {
    console.log("handleCart");
    fetchCart();
  }

  return (
    <div id="navbar-container">
      <div id="navbar">
        <div id="logo-stuff">
          <img id="logo" src="thicc-mint.png" />T H I C C - M I N T
        </div>
        <nav>
          {isLoggedIn ? (
            <div id="nav-items">
              {/* The navbar will show these links after you log in */}
              {isAdmin ?
              <Link to="/admin">
                Admin
              </Link> : null}
              <Link to="/games" className="nav-shop">
                Shop
              </Link>
              <Link to="/home" id="nav-home">
                Home
              </Link>
              <Link to="/cart" onClick={handleCart} className="nav-cart">
                Cart<i className="fas fa-cart-plus"></i>({totalGames})
              </Link>
              <a id="nav-logout" href="#" onClick={handleClick}>
                Logout
              </a>
            </div>
          ) : (
            <div id="nav-items">
              {/* The navbar will show these links before you log in */}
              <Link to="/games" className="nav-shop">
                Shop
              </Link>
              <Link to="/login" id="nav-login">
                Login
              </Link>
              <Link to="/signup" id="nav-signup">
                Sign Up
              </Link>
              <Link to="/cart" className="nav-cart">
                Cart<i className="fas fa-cart-plus"></i>
              </Link>
            </div>
          )}
        </nav>
      </div>
      <hr />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: !!state.auth.isAdmin,
    cart: state.cart,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
    fetchCart: () => dispatch(fetchCart()),
    //Put post games thunk here?
  };
};

export default connect(mapState, mapDispatch)(Navbar);

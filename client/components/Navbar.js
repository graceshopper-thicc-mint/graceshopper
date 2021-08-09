import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import { localStorage } from '../store/cart'

const Navbar = ({handleClick, isLoggedIn, isAdmin, cart}) =>  {

  function countTotalGames() {
    let count = 0;
    for(const key in localStorage) {
      if(key.length === 1) {
        count += Number(localStorage[key]);
      }
    }
    return Number(count);
  }

  return (
  <div>
    <div id="navbar">
      <div id="logo-stuff">
        T H I C C - M I N T
        <img id="logo" src="thicc-mint.png" />
      </div>
      <nav>
        {isLoggedIn ? (
        <div id="nav-items">
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          {isAdmin ? (
            <Link to="/admin">Admin</Link>) : null
          }
          <Link to="/games">SHOP</Link>
          <Link to="/cart">Cart<i className ="fas fa-cart-plus"></i>({countTotalGames()})</Link>
          <a id="logout" href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div id="nav-items">
          {/* The navbar will show these links before you log in */}
          <Link to="/games">SHOP</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/cart">Cart<i className ="fas fa-cart-plus"></i></Link>
        </div>
      )}
    </nav>
    </div>
    <hr />
  </div>
)}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: !!state.auth.isAdmin,
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    //Put post games thunk here?
  }
}

export default connect(mapState, mapDispatch)(Navbar)

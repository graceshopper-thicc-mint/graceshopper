import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, cart}) => (
  <div>
    <div id="navbar">
      <div id="logo-stuff">
        <img id="logo" src="thicc-mint.png" />
        T H I C C - M I N T
      </div>
      <nav>
        {isLoggedIn ? (
        <div id="nav-items">
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to="/games">SHOP</Link>
          <Link to="/cart">Cart<i className ="fas fa-cart-plus"></i>({cart.length})</Link>
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
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id,
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

import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, isAdmin}) => (
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
          <Link to="/cart">Cart<i className ="fas fa-cart-plus"></i>(numberofitemshere - should get updated automatically)</Link>
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
  console.log('navbar state: ', state);
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: !!state.auth.isAdmin
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

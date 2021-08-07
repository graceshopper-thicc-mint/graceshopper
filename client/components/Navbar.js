import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
<<<<<<< HEAD
    <h1>
      T H I C C - M I N T
      <img id="logo" src="thicc-mint.jpeg" />
    </h1>
    <nav>
      {isLoggedIn ? (
        <div>
=======
    <div id="navbar">
      <div id="logo-stuff">
        T H I C C - M I N T
        <img id="logo" src="thicc-mint.png" />
      </div>
      <nav>
        {isLoggedIn ? (
        <div id="nav-items">
>>>>>>> 8bb8740078612fa61b24ac00136490f465410162
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to="/games">SHOP</Link>
          <Link to="/cart">Cart<i className ="fas fa-cart-plus"></i>(numberofitemshere - should get updated automatically)</Link>
          <a href="#" onClick={handleClick}>
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
<<<<<<< HEAD

=======
>>>>>>> 8bb8740078612fa61b24ac00136490f465410162
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
    isLoggedIn: !!state.auth.id
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

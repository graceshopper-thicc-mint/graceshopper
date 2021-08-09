import React from 'react'
import {connect} from 'react-redux'
import {authenticate} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props
  return (
    displayName === "Sign Up" ? (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="firstName">
            <small>First Name</small>
          </label>
          <input name="firstName" type="text" />
          <label htmlFor="lastName">
            <small>Last Name</small>
          </label>
          <input name="lastName" type="text" />
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" />
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
          <label htmlFor="adminKey">
            <small>Admin Key</small>
          </label>
          <input name="adminKey" type="password" />
        </div>
        <button type="submit">Create an Account</button>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
    ) : (
      <div>
        <form onSubmit={handleSubmit} name={name}>
          <div>
            <label htmlFor="username">
              <small>Username</small>
            </label>
            <input name="username" type="text" />

            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" />
          </div>
          <button type="submit">Login</button>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
      </div>
    )
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const info = {
        firstName: evt.target.firstName.value,
        lastName: evt.target.lastName.value,
        email: evt.target.email.value,
        isAdmin: evt.target.adminKey.value,
        username: evt.target.username.value,
        password: evt.target.password.value
      }
      const formName = evt.target.name
      dispatch(authenticate(info, formName))
    },
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

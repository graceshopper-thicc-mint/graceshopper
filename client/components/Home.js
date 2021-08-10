import React, { useEffect } from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const Home = ({firstName, lastName}) => {
  return (
    <div id="head-text">
      <div id="text-on-image">
        <p>WELCOME {firstName} {lastName}!!</p>
        <p>HAPPY SHOPPING!!</p>
      </div>
        <img id="home-bg" src="gaming-background.jpeg" />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    firstName: state.auth.firstName,
    lastName: state.auth.lastName
  }
}

export default connect(mapState)(Home)

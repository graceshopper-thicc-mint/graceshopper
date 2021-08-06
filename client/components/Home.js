import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const Home = ({username, fetchCart}) => {

  return (
    <div>
      <h3>Welcome, {username}</h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  console.log('at home state: ', state);
  return {
    username: state.auth.username
  }
}

export default connect(mapState)(Home)

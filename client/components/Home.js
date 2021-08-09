import React, { useEffect } from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const Home = ({username}) => {
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
  return {
    username: state.auth.username
  }
}

export default connect(mapState)(Home)

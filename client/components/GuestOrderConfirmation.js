import React, { useEffect } from "react"
import axios from "axios"
import { connect } from "react-redux"

class GuestOrderConfirmation extends React.Component {
  constructor() {
    super()
  }
  render() {
    console.log(this.props)
    return (
      <div>
        <h1>THANKS FOR YOUR ORDER</h1>
        <p>
          Your confirmation number is {this.props.location.state.confirmationNumber}
        </p>
      </div>
    )
  }
}

export default GuestOrderConfirmation

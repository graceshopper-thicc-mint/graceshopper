import React, { useEffect } from "react"
import axios from "axios"
import { connect } from "react-redux"

class GuestOrderConfirmation extends React.Component {
  render() {
    return (
      <div className="order-container">
        <h1>THANKS FOR YOUR ORDER</h1>
        <p>
          Your confirmation number is {this.props.location.state.confirmationNumber}
        </p>
      </div>
    )
  }
}

export default GuestOrderConfirmation

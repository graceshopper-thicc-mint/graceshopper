import React, { useEffect } from "react"
import axios from "axios"
import { connect } from "react-redux"

class OrderConfirmation extends React.Component {
  constructor() {
    super()
    this.state = {
      confirmationNumber: ""
    }
  }
  async componentDidMount() {
    const { userId } = this.props
    const { data } = await axios.get(`/api/users/${userId}/purchases`)
    const recentPurchase = data[0]
    const number = recentPurchase.confirmationNumber
    this.setState({
      confirmationNumber: number
    })
  }
  render() {
    return(
      <div className="order-container">
        <h1>THANKS FOR YOUR ORDER</h1>
        <p>
          Your confirmation number is {this.state.confirmationNumber}. You will receive an order confirmation email shortly.
        </p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.id
  }
}

export default connect(mapStateToProps)(OrderConfirmation)

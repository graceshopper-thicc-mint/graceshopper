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
    const recentPurcqhase = data[0]
    const number = recentPurchase.confirmationNumber
    this.setState({
      confirmationNumber: number
    })
  }
  render() {
    return(
      <div>
        <h1>THANKS FOR YOUR ORDER</h1>
        <p>
          Your confirmation number is {this.state.confirmationNumber}
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

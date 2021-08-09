import React, { useEffect } from "react"
import axios from "axios"
import { connect } from "react-redux"
const sgMail = require('@sendgrid/mail')


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
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: 'korean223@example.com', // Change to your recipient
      from: 'thicc-mint.FSA@gmail.com', // Change to your verified sender
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('HELLO!')
      })
      .catch((error) => {
        console.error(error)
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

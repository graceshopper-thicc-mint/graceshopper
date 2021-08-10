import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

class Billing extends React.Component {
  render() {
    return (
      <div id="billing-info-container">
        <form>
          <h1>Billing Info </h1>
          <label htmlFor="firstName">
          </label>
          <input name="firstName" type="text" placeholder="First Name"/>

          <label htmlFor="lastName">
          </label>
          <input name="lastName" type="text" placeholder="Last Name"/>

          <label htmlFor="phone">
          </label>
          <input name="phone" type="text" placeholder="Phone"/>

          <label htmlFor="streetAddress">
          </label>
          <input name="streetAddress" type="text" placeholder="Street Address"/>

          <label htmlFor="zipcode">
          </label>
          <input name="zipcode" type="text" placeholder="Zip/Postal Code"/>
          <button type="submit">Place Order</button>
        </form>
      </div>
    )
  }
}

export default Billing

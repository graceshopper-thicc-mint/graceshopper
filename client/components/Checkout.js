import React, { useState } from "react"
import Billing from "./Billing"

const Checkout = () => {
  return (
    <div>
      <Payment />
      <Billing />
    </div>
  )
}

export default Checkout

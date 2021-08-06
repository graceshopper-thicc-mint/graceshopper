import React from "react"

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max)
}

const OrderConfirmation = () => {


  return(
    <div>
      <h1>THANKS FOR YOUR ORDER</h1>
      <p>Your confirmation number is {getRandomInt(1000000)}
      </p>
    </div>
  )
}

export default OrderConfirmation

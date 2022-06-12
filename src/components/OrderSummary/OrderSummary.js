import React from 'react'
import Ticket from '../Ticket/Ticket'
import Typography from '@mui/material/Typography';



function OrderSummary({order}) {
  return (

    <div className="order-summary">
        <Typography variant="h5" component="h2">
          Order Summary
        </Typography>
        <div className="buyer-summary">
          <p>
          Name:  {order.buyer.name}
          </p>
          <p>
          Email: {order.buyer.email}
          </p>
          <p>
          Phone: {order.buyer.phone}
          </p>          
        </div>
        <Ticket cart={order.cart} editable={false}/>
    </div>
  )
}

export default OrderSummary
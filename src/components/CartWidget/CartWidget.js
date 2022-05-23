import React from 'react'
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CartContext } from "../../context/CartContext/CartContext";

function CartWidget() {

  const { cart } = React.useContext(CartContext);

  return (
    <Badge badgeContent={cart.length} color="primary">
        <ShoppingCartIcon fontSize="large" color="action" />
    </Badge>
    
  )
}

export default CartWidget
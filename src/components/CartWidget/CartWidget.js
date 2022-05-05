import React from 'react'
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
function CartWidget() {
  return (
    <Badge badgeContent={4} color="primary">
        <ShoppingCartIcon fontSize="large" color="action" />
    </Badge>
    
  )
}

export default CartWidget
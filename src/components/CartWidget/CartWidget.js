import React from 'react'
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function CartWidget({badgeContent}) {


  return (
    <Badge badgeContent={badgeContent} color="primary">
        <ShoppingCartIcon fontSize="large" color="action" />
    </Badge>
    
  )
}

export default CartWidget
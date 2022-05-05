import React from 'react'
import Card from '@mui/material/Card';
function ItemListContainer({greeting}) {
  return (
    <Card className="example-greeting-card" variant="outlined"><h1 className='title'>{greeting}</h1></Card>
  )
}

export default ItemListContainer
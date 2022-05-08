import React, { useState } from 'react'

import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';


import { ItemCount } from '../ItemCount/ItemCount'

function ItemListContainer() {
  const itemsInit = [
    {
      title: 'Heineken',
      description: 'Heineken beer 300ml',
      image: 'images/products/heineken.jpeg',
      stock: 10,
      price: 1.45
    },
    {
      title: 'Brand',
      description: 'Brand beer 300ml',
      image: 'images/products/brand.png',
      stock: 10,
      price: 1.25
    },
    {
      title: 'Amstel',
      description: 'Amstel beer 12u pack',
      image: 'images/products/amstel-pack.jpg',
      stock: 10,
      price: 1.75
    }
  ]
  const [items, setItems] = useState(itemsInit);
  const onAdd = (itemId, count) => {
    let newItemsState = [...items]
    if(newItemsState[itemId].stock >= count){
      newItemsState[itemId].stock -= count
    }
    return setItems(newItemsState)
  }

  return (
    <div className="item-list">
      { items.map( (item, index) => 
      <Card key={index}>
        <CardHeader
       
        avatar={
          <Avatar sx={{ bgcolor: red[500], fontSize: 14 }} aria-label="recipe">
            {`€${item.price}`}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={item.title}
        subheader={`${item.stock} left`}
      />
      <CardMedia
        component="img"
        height="180px"
        image={item.image}
        alt="Beer"
      />
        <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {item.description}
        </Typography>
        
      </CardContent>
      <CardActions>
        <ItemCount itemId={index} stock={item.stock} initial={0} onAdd={onAdd} />
      </CardActions>
       
      </Card>
       
      
      )} 
    </div>
  )
}

export default ItemListContainer
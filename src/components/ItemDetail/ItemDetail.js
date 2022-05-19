import React from 'react'
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

function ItemDetail({item, onAdd}) {

  return (
    <div className="item-description">
        <Card>
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
         image={item.pictureUrl}
         alt="Beer"
       />
         <CardContent>
         <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
         {item.description}
         </Typography>

       </CardContent>
       <CardActions>
         <ItemCount itemId={item.id} stock={item.stock} initial={0} onAdd={onAdd} />
       </CardActions>

       </Card>
    
    </div>
    
  )
}

export default ItemDetail
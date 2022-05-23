import React, { useEffect, useState }  from 'react'
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
import Button from '@mui/material/Button'
import { CartContext } from "../../context/CartContext/CartContext";
import { useNavigate } from "react-router-dom";

function ItemDetail({item, onAdd}) {
  const { addItem, cart } = React.useContext(CartContext);

  const [endOrder, setEndOrder] = useState(false);
  const [selectedQty, setSelectedQty] = useState();
  const [initValue, setInitialValue] = useState(0);
  const navigate = useNavigate();

 
  const handleOnAdd = (count) => {
    setSelectedQty(count);
    onAdd(count);
    setEndOrder(true);
  }

  const handleEndOrder = () => {
    addItem(item, selectedQty);
    navigate("/cart", { replace: true });
  }

  useEffect (() => {
    const cartItem = cart.find( ci => ci.id === item.id);
    if(cartItem){
      setInitialValue(cartItem.quantity);
    }
  },  [cart, item.id, initValue])

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
       <CardActions className='actions'>
       { endOrder?
        (
          <>
          <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
          {`Quantity: ${selectedQty} units`} 
         </Typography>
          
          <Button size="large" color='success'  onClick={() => handleEndOrder() }>End Order</Button>
          </>
          
        ):
        (
         <ItemCount itemId={item.id} stock={item.stock} initial={initValue} onAdd={handleOnAdd} />
        )
        }
       </CardActions>

       </Card>
    
    </div>
    
  )
}

export default ItemDetail
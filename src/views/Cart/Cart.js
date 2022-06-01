import React from "react"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Ticket from '../../components/Ticket/Ticket';
import Typography from '@mui/material/Typography';
import { CartContext } from "../../context/CartContext/CartContext";


export default function Cart() {


  const { cart, clear, addItem, removeItem } = React.useContext(CartContext);


  return (
    <div className='cart' >
      {cart.reduce((a, {quantity}) => a + quantity, 0)>0 ? (
      <Card>
        <CardContent className='content'>
          <Typography gutterBottom variant="h5" component="div">
            My Cart
          </Typography>
          <Ticket cart={cart} addItem={addItem} removeItem={removeItem} />
        </CardContent>
        <CardActions className="actions">
          <Button size="large" color="error" onClick={clear}>Clear Cart</Button>
          <Button size="large" color="success" >Buy</Button>
        </CardActions>
      </Card>): 
      (<Card>
        <CardContent className='content'>
          <Typography gutterBottom variant="h5" component="div">
          <h1>The cart is empty</h1>
          </Typography>
        </CardContent>
        <CardActions className="actions">
          <Button variant="contained" href="/">Go Home</Button>
        </CardActions>
      </Card>)
      }
      </div>
  );
}

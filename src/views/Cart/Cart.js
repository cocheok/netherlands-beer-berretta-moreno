import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Ticket from '../../components/Ticket/Ticket';
import Typography from '@mui/material/Typography';
import { CartContext } from "../../context/CartContext/CartContext";


export default function Cart() {


  const { cart, clear } = React.useContext(CartContext);

  return (
    <div className='cart'>
      <Card>
        <CardContent className='content'>
          <Typography gutterBottom variant="h5" component="div">
            My Cart
          </Typography>
          <Ticket cart={cart} />
        </CardContent>
        <CardActions className="actions">
          <Button size="large" color="error" onClick={clear}>Clear Cart</Button>
          <Button size="large" color="success" >Buy</Button>
        </CardActions>
      </Card>
    </div>
  );
}

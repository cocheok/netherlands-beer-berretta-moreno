import React, {useState} from "react"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Order from '../../components/Order/Order';
import Typography from '@mui/material/Typography';
import { CartContext } from "../../context/CartContext/CartContext";
import Alert from '@mui/material/Alert';


export default function Cart() {


  const { cart, clear, addItem, removeItem } = React.useContext(CartContext);

  const [buyerFormValues, setBuyerFormValues] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const [message, setMessage] = useState();
  const handleSetMessage = (message, type) => {
    if(message && type) {
      setMessage(<Alert severity={type} >{message}</Alert>)
    } else {
      setMessage()
    }
    
  }
  return (
    <div className='cart' >
      
      {message}
      {cart.reduce((a, {quantity}) => a + quantity, 0)>0 ? (
        <Order cart={cart} addItem={addItem} removeItem={removeItem} clear={clear} buyerFormValues={buyerFormValues} setBuyerFormValues={setBuyerFormValues} setMessage={handleSetMessage}/>
      ): 
      (<Card className='error'>
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

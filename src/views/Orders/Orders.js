import React, {useState} from 'react'
import { UserContext } from "../../context/UserContext/UserContext";
import OrderContainer from '../../components/OrderContainer/OrderContainer';
import { GoogleLogin } from '@react-oauth/google';
import { Card, CardContent, Typography } from '@mui/material';

function Orders() {
const { user, login } = React.useContext(UserContext);
const [message, setMessage] = useState();

  return (
    <div className="order">
        {message}
        <Card>
            <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                My Orders
            </Typography>
            {user?
            <OrderContainer user={user} msj={setMessage}/>:
            <GoogleLogin
                onSuccess={credentialResponse => {
                    login(credentialResponse.credential)
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
                text='Login'
            />}
            </CardContent>
        </Card>
   </div>
  )
}

export default Orders
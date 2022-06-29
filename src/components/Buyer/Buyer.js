import React from 'react'
import TextField from '@mui/material/TextField';
import { UserContext } from "../../context/UserContext/UserContext";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';

function Buyer({buyerFormValues, setBuyerFormValues}) {
  const { user, login } = React.useContext(UserContext);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setBuyerFormValues({
        ...buyerFormValues,
        [id]: value,
        });
    };
    React.useEffect(() => { 
      if(user){
        setBuyerFormValues({
          email: user.decodedJWT.email,
          name: user.decodedJWT.name,
          phone: buyerFormValues.phone
        });
      } else {
        setBuyerFormValues({
          email: '',
          name: '',
          phone: buyerFormValues.phone
        })
      }
      
    },[user]);
  return (
    <form className='buyer'>
      <Card >
        <CardActionArea sx={{ display: 'flex', flexDirection: 'row'}}>
        {user?
          (<CardMedia
            component="img"
            image={user.decodedJWT.picture}
            alt="Profile"
          />)
          :<></>}
          <CardContent  sx={{ display: 'flex', flexDirection: 'column', gap: '2vh'}}>

          {user?
            [
              <Typography gutterBottom variant="h5" component="div" key="buyer-email">
            {user.decodedJWT.email}
            </Typography>,
            <Typography gutterBottom variant="h6" component="div" key="buyer-name">
            {user.decodedJWT.name}
            </Typography>,
            <TextField id="phone" label="PHONE" variant="outlined"  key="buyer-phone" onChange={handleInputChange} value={buyerFormValues.phone} />
            ]
          :(
            <GoogleLogin
                onSuccess={credentialResponse => {
                  login(credentialResponse.credential)
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
                text='Login'
                
              />
          )}
          
          </CardContent>
        </CardActionArea>
      
      </Card>
     </form>
  
  )
}

export default Buyer
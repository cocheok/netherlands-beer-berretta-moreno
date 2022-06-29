import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { UserContext } from "../../context/UserContext/UserContext";
import {Link} from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';

function UserMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const { login, logout, user } = React.useContext(UserContext);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };



    const handleLogout = () => {
      handleClose();
      googleLogout();
      logout()
    }

  
  return (
      <>
        <IconButton color="primary" aria-label="Login"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          >
          {user? <Avatar alt={user.decodedJWT.name} src={user.decodedJWT.picture} /> : (<Avatar> <PersonIcon /> </Avatar>)}
          
        </IconButton>  
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {user?[
          
            <MenuItem key='myOrdersItem' onClick={handleClose} component={Link} to="/order"><ShoppingCartIcon /> My Orders</MenuItem>,
            <MenuItem key='wishListItem' onClick={handleClose} component={Link} to="/wishlist"><FavoriteIcon /> Wish list</MenuItem>,
            <MenuItem key='LogOutItem' onClick={handleLogout}><LogoutIcon /> Logout</MenuItem>
          
          ]:(<MenuItem onClick={handleClose}><GoogleLogin
                onSuccess={credentialResponse => {
                  login(credentialResponse.credential)
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
                text='Login'
                
              />
              </MenuItem>)
            } 
          
          
        </Menu>
      
      </>
    
  )
}

export default UserMenu
import * as React from 'react';
import CartWidget from '../CartWidget/CartWidget';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import {Link} from 'react-router-dom';
import { Divider } from '@mui/material';

export default function Header({sections}) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {sections.map((section, index) => (
          <div key={index} >
            <ListItem button  component={Link} to={`${section.ref}`}>
              <ListItemText primary={section.title} />
            </ListItem>
            <List>
            {section.subsections?.map((subsection, subIndex) => 
                
                  <ListItem key={`sub-${subIndex}`} component={Link} button to={`${section.ref}/${subsection.id}`}>
                    <ListItemText secondary={subsection.title} />
                  </ListItem>
              )}
            </List>
            <Divider />
          </div>
          
        ))}
      </List>

    </Box>
  );
  
    return (
   
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer('left', true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
            anchor="left"
            open={state['left']}
            onClose={toggleDrawer('left', false)}
          >
            {list('left')}
          </Drawer>
            <div className="logo">
              <img src="/images/logo.png" alt='Netherlands Beer'/>     
            </div>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Netherlands Beer
            </Typography>
           
            <CartWidget /> 
          </Toolbar>
      </AppBar>
        
      );
}
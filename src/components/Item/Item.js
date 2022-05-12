import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import ItemDetailContainer from '../ItemDetailContainer/ItemDetailContainer';
// import { ItemCount } from '../ItemCount/ItemCount'
// <ItemCount itemId={item.id} stock={item.stock} initial={0} onAdd={onAdd} />

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Item({item}) {


  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card >
          <CardHeader  sx={{bgcolor: grey[200]}}
          title={item.title}
          titleTypographyProps={ {justifyContent: 'center', display: 'flex'}}
        />
        <CardMedia
          component="img"
          height="180px"
          image={item.pictureUrl}
          alt="Beer"
        />
          <CardContent sx={{ justifyContent: 'center', display: 'flex'}}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {item.description}
          </Typography>
          
        </CardContent>
        <CardActions sx={{ justifyContent: 'center', display: 'flex'}}>
          <Button variant="outlined" onClick={handleClickOpen}>See product detail</Button>
        </CardActions>
        <CardContent sx={{ bgcolor: grey[200], justifyContent: 'center', display: 'flex'}} >
          <Typography sx={{ fontSize: 16 }} color="text.primary" gutterBottom>
          {`Only ${item.stock} left`}
          </Typography>
          
        </CardContent>
      </Card>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
         <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {item.title}
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <ItemDetailContainer itemId={item.id} /> 
      </Dialog>
          
    </>
    
  )
}

export default Item
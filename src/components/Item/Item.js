import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import { UserContext } from '../../context/UserContext/UserContext'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton'
function Item({item}) {
  const { addToWishList, removeFromWishList, user, isItemOnWishList } = React.useContext(UserContext);
  const handleAddToFavorites = () => {
    if(item && user){
      addToWishList(item)
    }
  }
  const handleRemoveFromFavorites = () => {
    if(item && user){
      removeFromWishList(item)
    }
  }


  return (
      <Card >
          <CardHeader  sx={{bgcolor: grey[200]}}
          title={item.title}
          titleTypographyProps={ {justifyContent: 'center', display: 'flex'}}
          action={
            isItemOnWishList(item)? 
             <IconButton onClick={handleRemoveFromFavorites}>
               <FavoriteIcon />
             </IconButton>
             : <IconButton onClick={handleAddToFavorites}>
                  <FavoriteBorderIcon />
              </IconButton>
           }
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
          <Button variant="outlined" component={Link} to={`/item/${item.id}`}>See product detail</Button>
        </CardActions>
        <CardContent sx={{ bgcolor: grey[200], justifyContent: 'center', display: 'flex'}} >
          <Typography sx={{ fontSize: 16 }} color="text.primary" gutterBottom>
          {`Only ${item.stock} left`}
          </Typography>
          
        </CardContent>
      </Card>    
  )
}

export default Item
import React, { useEffect, useState }  from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import { ItemCount } from '../ItemCount/ItemCount'
import Button from '@mui/material/Button'
import { CartContext } from "../../context/CartContext/CartContext";
import { useNavigate } from "react-router-dom";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { UserContext } from '../../context/UserContext/UserContext'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
function ItemDetail({item, onAdd}) {
  const { addItem, cart } = React.useContext(CartContext);
  const { addToWishList, removeFromWishList, user, isItemOnWishList } = React.useContext(UserContext);

  const [endOrder, setEndOrder] = useState(false);
  const [selectedQty, setSelectedQty] = useState();
  const [initValue, setInitialValue] = useState(0);


  const getCustomSelectedValues = () => {
    const cartItemFound = cart.find( ci => ci.id === item.id);
    const cartCustomSelected = cartItemFound?.customSelected;
    let cartCustomSelectedValues = {};
    if(cartCustomSelected){
      Object.keys(cartCustomSelected).forEach(key => {
        cartCustomSelectedValues[key] = item.custom[key].indexOf(cartCustomSelected[key])
      })
    }
    return cartCustomSelectedValues;
  }

  const [selectedCustomTypes, setSelectedCustomTypes] = useState(getCustomSelectedValues());
  const [itemCustomTypes, seItemCustomTypes] = useState([]);
  const [custom, setCustom] = useState({});


  const navigate = useNavigate();

 
  const handleOnAdd = (count) => {
    setSelectedQty(count);
    onAdd(count);
    setEndOrder(true);
  }

  const handleEndOrder = () => {
    
    if(item.custom){
      //init custom if it was not changed
      Object.keys(item.custom).forEach( (label, labelIndex) => {
        if(!custom[label]){
          let newCustom = custom;
          newCustom[label] = item.custom[label][0];
          setCustom(newCustom);
        }

      })

    }
    const newItem = {...item, customSelected: custom};
    addItem(newItem, selectedQty);
    navigate("/cart", { replace: true });
  }

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

  const handleChangeType = (event) => {
    const modificationName = event.target?.name;
    const modificationValue = event.target?.value;
    const modificationValueString = item.custom[modificationName][event.target?.value];
    let myNewCustom = custom;
    
    myNewCustom[modificationName]=modificationValueString;
    setCustom(myNewCustom)

    let newSelectedCustomTypes = {...selectedCustomTypes};    
    newSelectedCustomTypes[modificationName] = modificationValue;
    setSelectedCustomTypes(newSelectedCustomTypes);

  };

 

  useEffect (() => {

    const cartItem = cart.find( ci => ci.id === item.id);
    if(cartItem){
      setInitialValue(cartItem.quantity);
      if(cartItem.customSelected && Object.keys(custom).length === 0 ){
        setCustom(cartItem.customSelected);
      } 
    }

    if(item.custom){
      let customTypes = [];
      Object.keys(item.custom).forEach( (label, labelIndex) => {
        
        let menuItems = [];
        item.custom[label].forEach( (value,index) => {
          menuItems.push(
            <MenuItem key={index} value={index}>{value}</MenuItem>
          )
        });
        const myCustomType = <FormControl key={labelIndex} fullWidth>
        <InputLabel id={label}>{label}</InputLabel>
        <Select
          labelId={label}
          label={label}
          value={selectedCustomTypes[label]?selectedCustomTypes[label]:0}
          name={label}
          onChange={handleChangeType}
        >
          {menuItems}
        </Select>
      </FormControl>
        customTypes.push(myCustomType);    
        



      });
      seItemCustomTypes(customTypes);
  
    }
  },  [cart, item, selectedCustomTypes])

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
          isItemOnWishList(item)? 
           <IconButton onClick={handleRemoveFromFavorites}>
             <FavoriteIcon />
           </IconButton>
           : <IconButton onClick={handleAddToFavorites}>
                <FavoriteBorderIcon />
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
        [
          ...itemCustomTypes,
         <ItemCount key='item-detail-count' itemId={item.id} stock={item.stock} initial={initValue} onAdd={handleOnAdd} />
        ]
        }
       </CardActions>

       </Card>
    
    </div>
    
  )
}

export default ItemDetail
import React, { useState } from 'react'
import ItemDetail from '../ItemDetail/ItemDetail';

import CircularProgress from '@mui/material/CircularProgress';
import { productDetails } from '../../data/products';
import Button from '@mui/material/Button';

function ItemDetailContainer({itemId}) {
  
  const [item, setItem] = useState(undefined);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState();

  const onAdd = (count) => {
    let newItemsState = {...item} 
    if(newItemsState.stock >= count){
      newItemsState.stock -= count
    }
    return setItem(newItemsState)
  }
  
  React.useEffect(() => {
    new Promise((resolve, reject) => 
    setTimeout(() => { 
      
      if(itemId){
        const filteredProducts = productDetails.filter(item => item.id === +itemId);
        
        if(!filteredProducts.length){
          reject(`There are no products with id ${itemId}`)
        } else {
          setItem(filteredProducts[0]);
        }
      }
      else{
        reject(`There is no product selected to display`);
        // display all products
        // setItems(products);
      }
      setLoaded(true);
      resolve(productDetails)
       
    }, 2000) ).catch( err => {
      const errorMessage = typeof err === 'string' ? err : 'There was an issue processing your request'; 
      // Go to the main page and display error message
      setLoaded(true);
      setError(errorMessage)
      //navigate(`/home?error=${errorMessage}`, { replace: true });
    });
  }, [itemId]);

  let itemDetail; 
  if(loaded) {
    if(item){
      itemDetail = <ItemDetail item={item} onAdd={onAdd} />
    } else {
      itemDetail = <div className="no-items">
      <h1>There is no item to display</h1>
      <h2>{`Error: ${error}`}</h2>
      <Button variant="contained" href="/">Go Home</Button>
      </div>
    }
  } else { 
    itemDetail = <CircularProgress size={90} color={"primary"}/>
      
  }
 
  return (
    <div className="item-detail-container">
    { itemDetail}
  </div>
      
  )
}

export default ItemDetailContainer
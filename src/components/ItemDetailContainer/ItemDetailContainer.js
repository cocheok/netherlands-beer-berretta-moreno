import React, { useState } from 'react'
import ItemDetail from '../ItemDetail/ItemDetail';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

function ItemDetailContainer({itemId}) {
  
  const [item, setItem] = useState(undefined);

  const onAdd = (count) => {
    let newItemsState = {...item} 
    if(newItemsState.stock >= count){
      newItemsState.stock -= count
    }
    return setItem(newItemsState)
  }
  
  React.useEffect(() => {
    axios.get(`https://api.mercadolibre.com/items/${itemId}`).then(itemDetail => { 
      setItem(itemDetail.data)
      console.log(itemDetail.data) 
  
  }).catch( err => alert('Error'))
  }, [itemId]);

 
  return (
    <div className="item-detail-container">
    { item ? <ItemDetail item={item} onAdd={onAdd} /> : <CircularProgress size={90} color={"primary"}/> }
  </div>
      
  )
}

export default ItemDetailContainer
import React, { useState } from 'react'
import ItemList from '../ItemList/ItemList';
import CircularProgress from '@mui/material/CircularProgress';

function ItemListContainer() {
  
  const [items, setItems] = useState([]);
  React.useEffect(() => {

    const itemsMock = [
      {
        id: 1,
        title: 'Heineken',
        description: 'Heineken beer 300ml',
        pictureUrl: 'images/products/heineken.jpeg',
        stock: 10,
        price: 1.45
      },
      {
        id: 2,
        title: 'Brand',
        description: 'Brand beer 300ml',
        pictureUrl: 'images/products/brand.png',
        stock: 7,
        price: 1.25
      },
      {
        id: 3,
        title: 'Amstel',
        description: 'Amstel beer 12u pack',
        pictureUrl: 'images/products/amstel-pack.jpg',
        stock: 15,
        price: 1.75
      }
    ];

    new Promise(resolve => 
      setTimeout(() => resolve(setItems(itemsMock)), 2000) )
  }, []); 
  
  
  
  
  const onAdd = (itemId, count) => {
    let newItemsState = [...items]
    const editedIndex = newItemsState.findIndex( item => item.id === itemId)
    if(newItemsState[editedIndex].stock >= count){
      newItemsState[editedIndex].stock -= count
    }
    return setItems(newItemsState)
  }
  let resToRender = <CircularProgress size={90} color={"primary"}/>
  if(items.length > 0){
    resToRender = <ItemList items={items} onAdd={onAdd} />
  } 
  return (
    <div className="item-list">
      {resToRender}
    </div>
  )
}

export default ItemListContainer
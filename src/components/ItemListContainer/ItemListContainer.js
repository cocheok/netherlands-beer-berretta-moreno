import React, { useState } from 'react'
import ItemList from '../ItemList/ItemList';
import CircularProgress from '@mui/material/CircularProgress';

function ItemListContainer() {
  
  const [items, setItems] = useState([]);
  
  React.useEffect(() => {
    // https://api.mercadolibre.com/items/MLA1106568272
    //MLA920764471
    // MLA920764489
    const itemsMock = [
      {
        id: 'MLA1106568272',
        title: 'Heineken',
        description: 'Heineken beer 300ml',
        pictureUrl: 'images/products/heineken.jpeg',
        stock: 10,
        price: 1.45
      },
      {
        id: 'MLA920764471',
        title: 'Grolsch',
        description: 'Grolsch beer 300ml',
        pictureUrl: 'images/products/brand.png',
        stock: 7,
        price: 1.25
      },
      {
        id: 'MLA920764489',
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
 

  /*
  React.useEffect(() => {
    fetch('http://localhost:6060/beers')
      .then(results => results.json())
      .then(data => { setItems(data) } );
  }, []);
*/
  
  /*
  
  const onAdd = (itemId, count) => {
    let newItemsState = [...items]
    const editedIndex = newItemsState.findIndex( item => item.id === itemId)
    if(newItemsState[editedIndex].stock >= count){
      newItemsState[editedIndex].stock -= count
    }
    return setItems(newItemsState)
  }
 */
  return (
    <div className="item-list-container">
      { (items.length > 0) ? <ItemList items={items} /> : <CircularProgress size={90} color={"primary"}/> }
    </div>
  )
}

export default ItemListContainer
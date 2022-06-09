import React, { useState } from 'react'
import ItemDetail from '../ItemDetail/ItemDetail';

import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { getDoc, doc, getFirestore} from 'firebase/firestore'

function ItemDetailContainer({itemId}) {
  
  const [item, setItem] = useState(undefined);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState();

  const onAdd = (count) => {
    let newItemsState = {...item} 
    if(newItemsState.stock >= count){
      newItemsState.quantity = count
    }
    return setItem(newItemsState)
  }
  
  React.useEffect(() => {
    new Promise((resolve, reject) => {
      if(itemId){
        const db = getFirestore();
        const docRef = doc(db, 'products', itemId);
        getDoc(docRef).then((docSnap) => {
          if(docSnap.exists()) {
            const itemResult = {id: docSnap.id, ...docSnap.data() };
            resolve(itemResult)
          }
          reject(`There is no product with id ${itemId}`)
        })
      }
      else {
        reject(`There is no product selected to display`);
        // display all products
        // setItems(products);
      }      
       
    }).then( itemRes => { 
      setItem(itemRes)    
    }).catch( err => {
      console.log(`ItemDetailContainer: ${JSON.stringify(err)}`)
      const errorMessage = typeof err === 'string' ? err : 'There was an issue processing your request'; 
      // Go to the main page and display error message
      setError(errorMessage)
      //navigate(`/home?error=${errorMessage}`, { replace: true });
    }).finally( () => {setLoaded(true)});
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
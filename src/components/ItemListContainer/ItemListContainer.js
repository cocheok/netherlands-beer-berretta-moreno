import React, { useState } from 'react'
import ItemList from '../ItemList/ItemList';
import CircularProgress from '@mui/material/CircularProgress';
// import { products } from '../../data/products';
import Button from '@mui/material/Button';
import { getDocs, query, where, collection, getFirestore} from 'firebase/firestore'

function ItemListContainer({categoryId}) {
  const [error, setError] = useState();

  const [itemsSection, setItemsSection] = useState()
  const [loaded, setLoaded] = useState(false);

  React.useEffect(() => {
    setLoaded(false)
    new Promise((resolve, reject) => 
      {
        const db = getFirestore();
        if(categoryId){
          const itemsFromCategory = query ( 
            collection( db, 'products'),
            where("category_id", '==', categoryId));
            getDocs(itemsFromCategory).then((snapshot) =>{
              if(snapshot.size === 0) {
                reject(`There are no products in the category ${categoryId}`)
              }
              resolve(snapshot.docs.map((doc) => ({id: doc.id, ...doc.data() })));
            })
          
        } else {

          const productsCollection = collection( db, 'products');
          getDocs(productsCollection).then((snapshot) =>{
            if(snapshot.size === 0) {
              reject('There are no products')
            }
            resolve(snapshot.docs.map((doc) => ({id: doc.id,  ...doc.data()})));     
          })
          
        }
         
      }).catch( err => {
        console.log(`ItemListContainer: ${JSON.stringify(err)}`)
        const errorMessage = typeof err === 'string' ? err : 'There was an issue processing your request'; 
        // Go to the main page and display error message
        setError(errorMessage);
        setItemsSection(<div className="no-items">
          <h1>There are no items to display</h1>
          <h2>{`Error: ${error}`}</h2>
          <Button variant="contained" size='large' href="/">Go Home</Button>
          </div>)
      }).then( (filteredProductsObtained) => {
        if(filteredProductsObtained.length > 0){
          setItemsSection(<ItemList items={filteredProductsObtained} />)
        } else {
          setItemsSection(<div className="no-items">
          <h1>There are no items to display</h1>
          <Button variant="contained" size='large' href="/">Go Home</Button>
          </div>)
        }
      }).finally( () => {setLoaded(true)});
  }, [categoryId]); 
  

  return (
    
    <div className="item-list-container">
      {loaded ? itemsSection : <CircularProgress size={90} color={"primary"}/> }
    </div>
  )
}

export default ItemListContainer
import React, { useState } from 'react'
import ItemList from '../ItemList/ItemList';
import CircularProgress from '@mui/material/CircularProgress';
import { products } from '../../data/products';
import Button from '@mui/material/Button';

function ItemListContainer({categoryId}) {
  const [error, setError] = useState();

  const [itemsSection, setItemsSection] = useState(<CircularProgress size={90} color={"primary"}/>)
  React.useEffect(() => {
    
    setItemsSection(<CircularProgress size={90} color={"primary"}/>);
    new Promise((resolve, reject) => 
      setTimeout(() => { 
        if(categoryId){
          const filteredProducts = products.filter(item => item.category_id === +categoryId);
          if(!filteredProducts || !filteredProducts?.length){
            //Route to /category/
            reject(`There are no products in the category ${categoryId}`)
          } else {
            resolve(filteredProducts);
          }
        } else {
          resolve(products);
        }
         
      }, 2000) ).catch( err => {
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
      });
  }, [categoryId, error]); 

  


  return (
    <div className="item-list-container">
      { itemsSection }    
    </div>
  )
}

export default ItemListContainer
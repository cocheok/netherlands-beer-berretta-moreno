import React, { useState } from 'react'
import ItemList from '../ItemList/ItemList';
import CircularProgress from '@mui/material/CircularProgress';
import { products } from '../../data/products';
import Button from '@mui/material/Button';

function ItemListContainer({categoryId, errorHandler}) {
  
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);
  
  React.useEffect(() => {
    

    new Promise((resolve, reject) => 
      setTimeout(() => { 
        
        if(categoryId){
          const filteredProducts = products.filter(item => item.category_id === +categoryId);
          setItems(filteredProducts);
          if(!filteredProducts.length){
            //Route to /category/
            reject(`There are no products in the category ${categoryId}`)
          }
        }
        else{
          //display all products
          setItems(products);
        }
        setLoaded(true);
        resolve(products)
         
      }, 2000) ).catch( err => {
        const errorMessage = typeof err === 'string' ? err : 'There was an issue processing your request'; 
        // Go to the main page and display error message
        errorHandler(errorMessage);
        setItems([]);
        setLoaded(true);
        //navigate(`/home?error=${errorMessage}`, { replace: true });
      });
  }, [categoryId, errorHandler, items.length]); 

  let itemsSection; 
  if(loaded) {
    if(items.length > 0){
      itemsSection = <ItemList items={items} />
    } else {
      itemsSection = <div className="no-items">
      <h1>There are no items to display</h1>
      <Button variant="text" href="/">Go Home</Button>
      </div>
    }
  } else { 
    itemsSection = <CircularProgress size={90} color={"primary"}/>
      
  }


  return (
    <div className="item-list-container">
      { itemsSection }    
    </div>
  )
}

export default ItemListContainer
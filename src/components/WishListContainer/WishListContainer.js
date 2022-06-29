import React from 'react'
import Item from '../Item/Item'
import { UserContext } from '../../context/UserContext/UserContext'

function WishListContainer() {
  
  const { wishList } = React.useContext(UserContext);

  return (
    <div className="wishlist">
    { wishList.map( (item, index) => { 
      
      
      return (<Item key={index} item={item} />) } )}
    </div>   
  )
}

export default WishListContainer
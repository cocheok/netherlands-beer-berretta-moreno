import React from 'react'
import Item from '../Item/Item'
function ItemList({items}) {
  return (
    <>
      { items.map( (item, index) => <Item key={index} item={item} /> )}
    </>    
  )
}

export default ItemList
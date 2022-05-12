import React from 'react'
import Item from '../Item/Item'
function ItemList({items, onAdd}) {
  return (
    <>
      { items.map( (item, index) => <Item key={index} index={index} item={item} onAdd={onAdd} /> )}
    </>    
  )
}

export default ItemList
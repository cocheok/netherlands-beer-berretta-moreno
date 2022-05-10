import React from 'react'
import Item from '../Item/Item'
function ItemList({items, onAdd}) {
  return (
    <div className="item-list">
      { items.map( (item, index) => <Item key={index} index={index} item={item} onAdd={onAdd} /> )}
    </div>    
  )
}

export default ItemList
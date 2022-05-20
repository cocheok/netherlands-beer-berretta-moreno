import React from 'react'
import { useParams } from "react-router-dom";
import ItemDetailContainer from '../../components/ItemDetailContainer/ItemDetailContainer';

function Item() {
  const { id } = useParams();
  

  return (
    <div className="category">
    <ItemDetailContainer itemId={id}/>
   </div>
  )
}

export default Item
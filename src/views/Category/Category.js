import React from 'react'
import { useParams } from "react-router-dom";
import ItemListContainer from '../../components/ItemListContainer/ItemListContainer'


function Category() {
  const { categoryId } = useParams();

  return (
    <div className="category">
      
    <ItemListContainer categoryId={categoryId} />
   </div>
  )
}

export default Category
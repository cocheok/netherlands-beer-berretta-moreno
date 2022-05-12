import React, {useState} from 'react'
import ImageGallery from 'react-image-gallery';

function ItemDetail({item, onAdd}) {
 // TODO: Usar api.mercadolibre.com, utilizar axios en vez de fetch... o tambien apimocha 
 
 const [itemToShow, setItemToShow] = useState({title: 'AAA', price: 10, images:[]});

React.useEffect(() => {
    console.log('item')
    console.log(item)
    const itemParsed = {
        title: item.title,
        images: item.pictures.map(pic => { return { original: pic.url, thumbnail: pic.url } }),
        price: item.price
    }
    console.log('itemParsed')
    console.log(itemParsed)
    setItemToShow(itemParsed)
   
 }, [item]);
  return (
    <div className="item-description">
        <div className="images">
        <ImageGallery thumbnailPosition='left' items={itemToShow?.images} />
        </div>
        
        <div className="details">
            <h1> {itemToShow?.title} </h1>
            <h2> Price: ${itemToShow?.price} </h2>
        </div>
       
    </div>
    
  )
}

export default ItemDetail
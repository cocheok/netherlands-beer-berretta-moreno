import React, {useEffect, useState} from 'react';
import Header from './components/NavBar/NavBar';
import Home from './views/Home/Home';
import Cart from './views/Cart/Cart';
import { CartProvider } from './context/CartContext/CartContext'

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Category from './views/Category/Category';
import Item from './views/Item/Item';
import { getDocs, collection, getFirestore} from 'firebase/firestore'

function App() {
  const [sections, setSections] = useState([]);
  

  useEffect (() => {
    const db = getFirestore();
    const categoriesCollection = collection( db, 'categories');
    getDocs(categoriesCollection).then((snapshot) =>{
      if(snapshot.size === 0) {
        console.log('No results')
      } 
      setSections([
        {
          title: 'Home',
          ref: '/'
        },
        {
          title: 'Beer types',
          ref: '/category',
          subsections: snapshot.docs.map((doc) => ({id: doc.id, title: doc.data().title }))
        }
      ])
    })
    // obtener los datos de categories DE FIREBASE y mostrarlos
    // Lo mismo con los items
    

  }, [])
  

  return (
    <div className="app">  
      
        <BrowserRouter>
          <CartProvider>
            <Header sections={sections} />
            <div className="body">
                <Routes>
                  <Route exact path="/item/:id" element={<Item />} />
                  <Route exact path="/category/:categoryId" element={<Category />} />
                  <Route exact path="/cart" element={<Cart />} />
                  <Route exact path="*" element={<Home />} />
                </Routes>
              </div>
          </CartProvider>
        </BrowserRouter>
        </div>  
  );
}

export default App;

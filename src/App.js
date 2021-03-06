import React, {useEffect, useState} from 'react';
import Header from './components/NavBar/NavBar';
import Home from './views/Home/Home';
import Cart from './views/Cart/Cart';
import { CartProvider } from './context/CartContext/CartContext'
import { UserProvider } from './context/UserContext/UserContext'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Category from './views/Category/Category';
import Item from './views/Item/Item';
import { getDocs, collection, getFirestore} from 'firebase/firestore'
import { GoogleOAuthProvider } from '@react-oauth/google';
import WishList from './views/WishList/WishList';
import Orders from './views/Orders/Orders';

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
          <GoogleOAuthProvider clientId="105860715541-ru7plhctmdr28nb3c6ps2oj72qdf652o.apps.googleusercontent.com">
            <UserProvider>
              <CartProvider>
                <Header sections={sections} />
                <div className="body">
                    <Routes>
                      <Route exact path="/item/:id" element={<Item />} />
                      <Route exact path="/category/:categoryId" element={<Category />} />
                      <Route exact path="/cart" element={<Cart />} />
                      <Route exact path="/order" element={<Orders />} />
                      <Route exact path="/wishlist" element={<WishList />} />
                      <Route exact path="*" element={<Home />} />
                    </Routes>
                  </div>
              </CartProvider>
            </UserProvider>

            </GoogleOAuthProvider>
        </BrowserRouter>
        </div>  
  );
}

export default App;

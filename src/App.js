import React from 'react';
import Header from './components/NavBar/NavBar';
import Home from './views/Home/Home';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Category from './views/Category/Category';
import Item from './views/Item/Item';

function App() {
  const sections = [
    {
      title: 'Home',
      ref: '/'
    },
    {
      title: 'Beer types',
      ref: '/category',
      subsections: [ 
        {
          id: 1,
          title: 'Golden'
        },
        {
          id: 2,
          title: 'IPA'
        },
        {
          id: 3,
          title: 'Amber'
        }
      ]
    }
  ]

  return (
    <div className="app">  
      
        <BrowserRouter>
        <Header sections={sections} />
        <div className="body">
            <Routes>
              <Route exact path="/item/:id" element={<Item />} />
              <Route exact path="/category/:categoryId" element={<Category />} />
              <Route exact path="*" element={<Home />} />
            </Routes>
          </div>
    
        </BrowserRouter>
        </div>  
  );
}

export default App;

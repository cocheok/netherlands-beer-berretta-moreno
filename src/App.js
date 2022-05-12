import React from 'react';
import Header from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
function App() {
  const sections = [
    {
      title: 'Home'
    },
    {
      title: 'Products'
    },
    {
      title: 'About us'
    },
    {
      title: 'Contact'
    }
  ]
  
  return (
    <div className="app">
      <Header sections={sections} />
      <div className="body">
        <section className="product">
          <ItemListContainer/>
        </section>
      </div>
      
      
    </div>
  );
}

export default App;

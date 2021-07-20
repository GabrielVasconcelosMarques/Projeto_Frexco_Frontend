import React, { Component } from 'react';
import { Header } from './components/header/Header';
import Routes from './routes';



function App() {
  return (
    <div className="App">
      <Header>Produtos</Header>
      <Routes />
    </div>
  );
}

export default App;

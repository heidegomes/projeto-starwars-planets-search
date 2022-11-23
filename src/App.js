import React from 'react';
import './App.css';
import Filtro from './components/Filtro';
import Table from './components/Table';
import StarWarsProvider from './context/StarWarsProvider';

function App() {
  return (
    <StarWarsProvider>
      <Filtro />
      <Table />
    </StarWarsProvider>
  );
}

export default App;

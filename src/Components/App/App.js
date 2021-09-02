import React, { useState } from 'react';

import Header from '../Header/Header';
import RandomPlanet from '../RandomPlanet/RandomPlanet';
import ItemList from '../ItemList/ItemList';
import PersonDetails from '../PersonDetails/PersonDetails';

import './App.css';

const App = () => {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const onSelected = (id) => {
    console.log(id);
    setSelectedPerson(id);
  };
  return (
    <div>
      <Header />
      <RandomPlanet />

      <div className='row mb2'>
        <div className='col-md-6'>
          <ItemList onSelected={onSelected} />
        </div>
        <div className='col-md-6'>
          <PersonDetails personId={selectedPerson} />
        </div>
      </div>
    </div>
  );
};

export default App;

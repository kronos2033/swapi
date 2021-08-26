import React, { useState, useEffect } from 'react';
import SwapiApi from '../../utils/SwapiApi';
import Preloader from '../Preloader/Preloader';
import './RandomPlanet.css';

export default function RandomPlanet() {
  const [planetData, setPlanetData] = useState({});
  const swapiService = new SwapiApi();
  const onPlanetLoaded = (planet) => {
    setPlanetData(planet);
  };
  const updatePlanet = () => {
    const id = Math.floor(Math.random() * 10) + 1;
    swapiService.getPlanet(id).then(onPlanetLoaded);
  };

  useEffect(() => {
    updatePlanet();
  }, []);

  const { name, population, rotationPeriod, diameter, id } = planetData;

  return (
    <>
      <div className='random-planet jumbotron rounded card m-4'>
        {id ? <ImageBlock id={id} /> : <Preloader />}
        <div>
          <h4>{name}</h4>
          <ul className='list-group list-group-flush'>
            <li className='list-group-item'>
              <span className='term'>Population</span>
              <span>{population}</span>
            </li>
            <li className='list-group-item'>
              <span className='term'>Rotation Period</span>
              <span>{rotationPeriod}</span>
            </li>
            <li className='list-group-item'>
              <span className='term'>Diameter</span>
              <span>{diameter}</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

function ImageBlock({ id }) {
  return (
    <img
      className='planet-image'
      src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
      alt='planet-image'
    />
  );
}

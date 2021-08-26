import React, { useState, useEffect } from 'react';
import SwapiApi from '../../utils/SwapiApi';
import './RandomPlanet.css';

export default function RandomPlanet() {
  const [planetData, setPlanetData] = useState({
    id: null,
    name: null,
    population: null,
    rotationPeriod: null,
    diameter: null,
  });
  const swapiService = new SwapiApi();

  const updatePlanet = () => {
    const id = Math.floor(Math.random() * 25) + 1;
    swapiService.getPlanet(id).then((planet) => {
      setPlanetData({
        id,
        name: planet.name,
        population: planet.population,
        rotationPeriod: planet.rotation_period,
        diameter: planet.diameter,
      });
    });
  };

  useEffect(() => {
    updatePlanet();
  }, []);
  const { name, population, rotationPeriod, diameter, id } = planetData;
  return (
    <div className='random-planet jumbotron rounded '>
      <img
        className='planet-image'
        src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
        alt='planet-image'
      />
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
            <span className='term'>{diameter}</span>
            <span>100</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

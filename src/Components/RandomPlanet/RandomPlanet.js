import React, { useState, useEffect } from 'react';
import SwapiApi from '../../utils/SwapiApi';
import Preloader from '../Preloader/Preloader';
import NotFound from '../NotFound/NotFound';
import './RandomPlanet.css';

export default function RandomPlanet() {
  const [planetData, setPlanetData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const swapiService = new SwapiApi();
  const onPlanetLoaded = (planet) => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    setPlanetData(planet);
  };
  const onError = (err) => {
    console.log(`Во время загрузки произошла ошибка ${err}`);
    setError(true);
  };
  const isLoaded = planetData && !error;
  const updatePlanet = () => {
    setLoading(true);
    const id = Math.floor(Math.random() * 10) + 1;
    swapiService.getPlanet(id).then(onPlanetLoaded).catch(onError);
  };
  const handleUpdate = () => {
    updatePlanet();
  };
  useEffect(() => {}, []);

  const { name, population, rotationPeriod, diameter, id } = planetData;

  return (
    <>
      <div className='random-planet jumbotron rounded card m-4'>
        {!loading ? (
          isLoaded ? (
            <ImageBlock id={id} />
          ) : (
            <NotFound />
          )
        ) : (
          <Preloader />
        )}
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
          <button className='random-planet__button' onClick={handleUpdate}>
            New planet
          </button>
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

import React, { Component } from 'react';
import Preloader from '../Preloader/Preloader';
import SwapiApi from '../../utils/SwapiApi';

import './ItemList.css';

export default class ItemList extends Component {
  api = new SwapiApi();
  state = { personList: null };

  componentDidMount() {
    this.api.getAllPeople().then((personList) => {
      this.setState({ personList });
    });
  }
  render() {
    const { personList } = this.state;
    if (!personList) {
      return <Preloader />;
    }

    return (
      <ul className='item-list list-group'>
        {personList.map(({ id, name }) => {
          return (
            <li
              className='list-group-item'
              onClick={() => {
                this.props.onSelected(id);
              }}
              key={id}
            >
              {name}
            </li>
          );
        })}
      </ul>
    );
  }
}

// src/components/Layout.jsx
import React from 'react';
import { Link } from 'react-router';

export default class Layout extends React.Component {
  render() {
    return (
      <div className="app-container">
        <header>
          <h1>
            Hyperoptic Rentals
          </h1>
        </header>
        <div className="app-content">{this.props.children}</div>
        <footer>
          <p>
            Rental information provided 
            by the <a href="http://developer.zoopla.com/" target="blank">Zoopla Property API</a>.
          </p>
        </footer>
      </div>
    );
  }
}

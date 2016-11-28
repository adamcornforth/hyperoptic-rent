// src/components/IndexPage.jsx
import React, {PropTypes, Component} from 'react';
import GoogleMap from 'google-map-react';
import LocationsList from './LocationsList.jsx';

export default class IndexPage extends React.Component {
  constructor() {
    super();
    this.state = { 
      items: [], 
      gmap: {
        center: {lat: 51.560782, lng: -0.120671},
        zoom: 14
      },
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    fetch('/locations/N7')
    .then((result) => {
      return result.json();
    })
    .then((json) => {
      this.setState({items:json});
    });
  }
  render() {
    if(this.state.items.length) {
      return (
        <div>
          {/*<div className="map">*/}
            {/*<GoogleMap*/}
              {/*bootstrapURLKeys={{*/}
                {/*key: 'AIzaSyCTbm6xphy2Y_qqpbj1NqqPZ0ZbcfXg7Qw'*/}
              {/*}}*/}
              {/*defaultCenter={this.state.gmap.center}*/}
              {/*defaultZoom={this.state.gmap.zoom}>*/}
            {/*</GoogleMap>*/}
          {/*</div>*/}
          <LocationsList items={this.state.items} />
        </div>
      );
    } else {
      return (
        <div className="home">
          Loading...
        </div>
      );
    }
  }
}
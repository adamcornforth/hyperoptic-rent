// src/components/IndexPage.jsx
import React, {PropTypes, Component} from 'react';
import shouldPureComponentUpdate from 'react-pure-render';
import GoogleMap from 'google-map-react';
import controllable from 'react-controllables';

import LocationsList from './LocationsList.jsx';
import LocationMarker from './LocationMarker.jsx';

import {K_SIZE} from './location_marker_hover_styles.js';

@controllable(['center', 'zoom', 'hoverKey', 'clickKey'])
export default class IndexPage extends React.Component {
  static propTypes = {
    center: PropTypes.array, // @controllable
    zoom: PropTypes.number, // @controllable
    hoverKey: PropTypes.string, // @controllable
    clickKey: PropTypes.string, // @controllable
    onCenterChange: PropTypes.func, // @controllable generated fn
    onZoomChange: PropTypes.func, // @controllable generated fn
    onHoverKeyChange: PropTypes.func, // @controllable generated fn

    greatPlaces: PropTypes.array
  };

  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor() {
    super();
    this.state = { 
      postcode: 'N7',
      items: [],
      gmap: {
        center: {lat: 51.560782, lng: -0.120671},
        zoom: 14
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  handleChange(event) {
    this.setState({postcode:event.target.value});
  }

  handleBlur(event) {
    this.setState({postcode:event.target.value});

    fetch('/locations/'+event.target.value)
      .then((result) => {
        return result.json();
      })
      .then((json) => {
        this.setState({items:json});
      });
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

  _osChange = (center, zoom /* , bounds, marginBounds */) => {
    this.props.onCenterChange(center);
    this.props.onZoomChange(zoom);
  }

  _onChildClick = (key, childProps) => {
    this.props.onCenterChange([childProps.lat, childProps.lng]);
  }

  _onChildMouseEnter = (key /*, childProps */) => {
    this.props.onHoverKeyChange(key);
  }

  _onChildMouseLeave = (/* key, childProps */) => {
    this.props.onHoverKeyChange(null);
  }

  render() {
    if(this.state.items.length) {
      const places = this.state.items.map(result => {
        if(result.results) {
          return (
            <LocationMarker
              key={result.location.siteId}
              text={result.location.siteName}
              lat={result.location.latitude}
              lng={result.location.longitude}
              // use your hover state (from store, react-controllables etc...)
              hover={this.props.hoverKey === result.location.siteId} />
          );
        }
      });
      return (
        <div>
          <div>
            <h2>{this.state.postcode}</h2>
            <input type="text"
              placeholder="Search..."
              defaultValue={this.state.postcode}
              onChange={this.handleChange}
              onBlur={this.handleBlur} />
          </div>
          <div className="map">
            <GoogleMap
              bootstrapURLKeys={{
                key: 'AIzaSyCTbm6xphy2Y_qqpbj1NqqPZ0ZbcfXg7Qw'
              }}
              defaultCenter={this.state.gmap.center}
              defaultZoom={this.state.gmap.zoom}
              center={this.props.center}
              zoom={this.props.zoom}
              hoverDistance={K_SIZE / 2}
              onChange={this.onChange}
              onChildClick={this.onChildClick}
              onChildMouseEnter={this.onChildMouseEnter}
              onChildMouseLeave={this.onChildMouseLeave}
              >
              {places}
            </GoogleMap>
          </div>
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
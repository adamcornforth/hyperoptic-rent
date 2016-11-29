// src/components/IndexPage.jsx
import React, {PropTypes, Component} from 'react';
import shouldPureComponentUpdate from 'react-pure-render';
import GoogleMap from 'google-map-react';
import controllable from 'react-controllables';
import {FormControl} from 'react-bootstrap';

import LocationsList from './LocationsList.jsx';
import LocationMarker from './LocationMarker.jsx';

import {K_SIZE} from './location_marker_hover_styles.js';

const postcodes = require('./../../routes/models/data/locations');

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
      'locations': postcodes
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  handleChange(event) {
    this.setState({postcode:event.target.value.toUpperCase()});
  }

  handleBlur(event) {
    this.setState({postcode:event.target.value.toUpperCase(),items:[]});

    fetch('/locations/'+event.target.value.toUpperCase())
      .then((result) => {
        return result.json();
      })
      .then((json) => {
        this.setState({items:json});
        
        if(json.length && json[0].location.latitude) {
          this.setState({no_items:false});
          this.setState({center:{lat:parseFloat(json[0].location.latitude), lng: parseFloat(json[0].location.longitude)}, zoom: 14});
        } else {
          this.setState({no_items:true});
        }
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
    return (
      <div className="row">
        <div className="col-xs-12">
          <h2>
            {
              (this.state.postcode)
                ? <span>Search for <strong>{this.state.postcode}</strong>...</span>
                : null
            }
          </h2>
        </div>
        <div className="col-md-6">
          <FormControl type="text"
            placeholder="Search by postcode..."
            defaultValue={this.state.postcode}
            onChange={this.handleChange}
            onBlur={this.handleBlur} />
          <br />
          {
            (this.state.items.length)  ? 
            (
              <LocationsList items={this.state.items} />
            )
            : ( 
                (this.state.no_items) ? 
                (
                  <div>Sorry, no results could be found.</div>
                ) : 
                ( <div>Loading...</div> 
                )
              )
          }
          <br />
          <small className='text-muted'>
            {
              this.state.locations.map(location => {
                return <span>{location.greaterCityLocator} </span>
              })
            }
          </small>
        </div>
        <div className="col-md-6">
          <div className="map">
            { (this.state.items.length) ? 
              (
                <GoogleMap
                  bootstrapURLKeys={{
                    key: 'AIzaSyCTbm6xphy2Y_qqpbj1NqqPZ0ZbcfXg7Qw'
                  }}
                  defaultCenter={this.state.gmap.center}
                  defaultZoom={this.state.gmap.zoom}
                  center={this.state.center}
                  zoom={this.props.zoom}
                  hoverDistance={K_SIZE / 2}
                  onChange={this.onChange}
                  onChildClick={this.onChildClick}
                  onChildMouseEnter={this.onChildMouseEnter}
                  onChildMouseLeave={this.onChildMouseLeave}
                  >
                  {
                    this.state.items.map(result => {
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
                    })
                  }
                </GoogleMap>
              ) 
              : null
            }  
          </div>
        </div>
      </div>
    );
  }
}
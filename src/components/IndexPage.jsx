// src/components/IndexPage.jsx
import React, {PropTypes, Component} from 'react';
import shouldPureComponentUpdate from 'react-pure-render';
import GoogleMap from 'google-map-react';
import controllable from 'react-controllables';
import {FormGroup, InputGroup, Button, FormControl, Glyphicon} from 'react-bootstrap';

import LocationsList from './LocationsList';
import LocationMarker from './LocationMarker';

import {K_SIZE} from './location_marker_hover_styles.js';

let postcodes = require('./../routes/models/data/locations');

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

    const only_postcodes = postcodes.map(location => location.greaterCityLocator).sort();

    this.state = { 
      postcode: '',
      items: [],
      gmap: {
        center: {lat: 51.560782, lng: -0.120671},
        zoom: 14
      },
      postcodes: [...new Set(only_postcodes)]
    };

    this.handleClickSearch = this.handleClickSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handlePostcodeClick = this.handlePostcodeClick.bind(this);
    this.doSearch = this.doSearch.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  handleClickSearch() {
    this.doSearch(this.state.postcode);
  }

  handleChange(event) {
    this.setState({postcode:event.target.value.toUpperCase()});
  }

  handleBlur(event) {
    this.setState({postcode:event.target.value.toUpperCase(),items:[]});

    this.doSearch(event.target.value.toUpperCase());
  }

  handlePostcodeClick(event) {
    this.setState({postcode:event.target.getAttribute("data-postcode").toUpperCase(),items:[]});

    this.doSearch(event.target.getAttribute("data-postcode").toUpperCase());
  }

  doSearch(postcode) {
    fetch('/locations/'+postcode)
      .then((result) => {
        return result.json();
      })
      .then((json) => {
        this.setState({items:json.results, results_count:json.rentals});
        
        if(json.results.length && json.results[0].location.latitude) {
          this.setState({no_items:false});
          this.setState({center:{lat:parseFloat(json.results[0].location.latitude), lng: parseFloat(json.results[0].location.longitude)}, zoom: 14});
        } else {
          this.setState({no_items:true});
        }
      });
  }

  componentDidMount() {
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
        <div className="col-md-6">
          <FormGroup>
            <InputGroup>
              <FormControl type="text"
                key="postcode-search"
                placeholder="Search by postcode district e.g. N7, E1, W9..."
                value={this.state.postcode}
                onChange={this.handleChange}
                onBlur={this.handleBlur} />
              <InputGroup.Button onClick={this.handleClickSearch}>
                <Button>
                  <Glyphicon glyph="search" />
                </Button>
              </InputGroup.Button>
            </InputGroup>
          </FormGroup>
          {
            (this.state.items.length)  ? 
            (
              <LocationsList items={this.state.items} results_count={this.state.results_count} postcode={this.state.postcode} />
            )
            : ( 
                (this.state.no_items) ? 
                (
                  <div>Sorry, no results could be found.</div>
                ) : 
                ( (this.state.postcode) ? 
                  (
                    <div>Loading...</div> 
                  ) : null
                )
              )
          }
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
                      if(result.result.length) {
                        return (
                          <LocationMarker
                            key={result.location.siteId}
                            text={result.location.siteName}
                            lat={result.location.latitude}
                            lng={result.location.longitude}
                            // use your hover state (from store, react-controllables etc...)
                            hover={this.props.hoverKey === result.location.siteId} />
                        );
                      } else {
                        return null;
                      }
                    })
                  }
                </GoogleMap>
              ) 
              : null
            }  
          </div>
        </div>
        <div className="col-xs-12">
          <small className='text-muted'>
            {this.state.postcodes.length ? (
              <span>All Hyperoptic Postcodes <br /><br /></span>
              ) : null
            }
            {
              this.state.postcodes.map(postcode => {
                return <a href='#' className={this.state.postcode === postcode ? "btn btn-primary btn-xs" : "btn btn-default btn-xs"} key={postcode} onClick={this.handlePostcodeClick} data-postcode={postcode}>{postcode}</a>
              })
            }
          </small>
        </div>
      </div>
    );
  }
}
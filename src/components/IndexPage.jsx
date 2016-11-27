// src/components/IndexPage.jsx
import React, {PropTypes, Component} from 'react';
import GoogleMap from 'google-map-react';

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
    fetch('/locations')
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
          <div className="map">
            <GoogleMap
              bootstrapURLKeys={{
                key: 'AIzaSyCTbm6xphy2Y_qqpbj1NqqPZ0ZbcfXg7Qw'
              }}
              defaultCenter={this.state.gmap.center}
              defaultZoom={this.state.gmap.zoom}>
            </GoogleMap>
          </div>
          {
            this.state.items.map((result, id) => {
              return (<div key={result.location.siteId}>
                <a href={"https://www.hyperoptic.com/live/?siteid="+result.location.siteId}>
                  {result.location.siteName}
                </a>
                <div>
                  <ul>
                    {
                      result.result.map((rental, rental_id) => {
                        {
                          return (<div key={rental_id}>
                            £{rental.item.rental_prices.per_month}: 
                            <a href={rental.item.details_url}>
                              {rental.item.displayable_address}
                            </a>
                          </div>)
                        }
                      })
                    }
                  </ul>
                </div>
              </div>)
            })
          }
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
// src/components/LocationsList.jsx
import React, {PropTypes, Component} from 'react';
import GoogleMap from 'google-map-react';
import { Media, Panel } from 'react-bootstrap';

export default class LocationsList extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
    }

    render() {
        if(this.props.items) {
            return (
                <Panel header={
                    (this.props.postcode)
                      ? <p><small>Your search for <strong>{this.props.postcode}</strong>... <span className="pull-right">(from {this.props.results_count} rentals)</span></small></p>
                      : null
                  }>
                  <Media.List>
                  {
                    this.props.items.map((result, id) => {
                      return (<Media.ListItem key={result.location.siteId}>
                        <Media.Left>
                            <a href={"https://www.hyperoptic.com/live/?siteid="+result.location.siteId}>
                                <img width={64} height="auto" src={result.location.imageSiteLink} alt="Location" />
                            </a>
                        </Media.Left>
                        <Media.Body>
                          <Media.Heading>
                            <a href={"https://www.hyperoptic.com/live/?siteid="+result.location.siteId}>
                              {result.location.siteName}
                            </a>
                          </Media.Heading>

                          {
                            result.result.map((rental, rental_id) => {
                              {
                                return (<Media key={rental_id}>
                                          <Media.Left>
                                            <img width={88} height="auto" src={rental.item.image_354_255_url} alt="Rental" />
                                          </Media.Left>
                                          <Media.Body>
                                            <a href={rental.item.details_url}>
                                                {rental.item.displayable_address}
                                            </a>
                                            <br />  
                                            £{rental.item.rental_prices.per_month}
                                          </Media.Body>
                                </Media>)
                              }
                            })
                          }
                        </Media.Body>
                      </Media.ListItem>)
                    })
                  }
              </Media.List>
            </Panel>);
        } else {
            return (
                <div className="home">
                    Loading...
                </div>
            );
        }
    }
}
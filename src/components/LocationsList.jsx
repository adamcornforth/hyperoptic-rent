// src/components/LocationsList.jsx
import React, {PropTypes, Component} from 'react';
import GoogleMap from 'google-map-react';

export default class LocationsList extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
    }

    render() {
        if(this.props.items) {
            return (<div>
                {
                    this.props.items.map((result, id) => {
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
            </div>);
        } else {
            return (
                <div className="home">
                    Loading...
                </div>
            );
        }
    }
}
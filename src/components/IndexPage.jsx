// src/components/IndexPage.jsx
import React from 'react';

export default class IndexPage extends React.Component {
  constructor(props) {
    super();
    this.state = { items: [] };
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
          {
            this.state.items.map((result) => {
              return <div>{result.location.siteName}</div>  
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
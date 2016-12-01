import React, {PropTypes, Component} from 'react';
import shouldPureComponentUpdate from 'react-pure-render';
import {locationMarker, locationMarkerHighlight, locationMarkerText, locationMarkerTextHighlight} from './location_marker_highlight_styles.js';

export default class LocationMarker extends React.Component {
  static propTypes = {
    text: PropTypes.string
  };

  static defaultProps = {};

  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
  }

  setHover(hover) {
    this.props.hover = hover;
  }

  render() {
    const style = (this.props.results || this.props.$hover) ? locationMarkerHighlight : locationMarker;
    const style_span = this.props.results ? locationMarkerTextHighlight : locationMarkerText;

    return (
       <div style={style}>
          { 
            this.props.results ? 
              (<span style={style_span}>{this.props.text}</span>) 
            : null
          }
       </div>
    );
  }
}

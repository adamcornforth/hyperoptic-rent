import React, {PropTypes, Component} from 'react';
import shouldPureComponentUpdate from 'react-pure-render';
import {locationMarker, locationMarkerHover, locationMarkerText, locationMarkerTextHover} from './location_marker_hover_styles.js';

export default class LocationMarker extends React.Component {
  static propTypes = {
    // GoogleMap pass $hover props to hovered components
    // to detect hover it uses internal mechanism, explained in x_distance_hover example
    $hover: PropTypes.bool,
    text: PropTypes.string
  };

  static defaultProps = {};

  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
  }

  render() {
    const style = this.props.hover ? locationMarkerHover : locationMarker;
    const style_span = this.props.hover ? locationMarkerTextHover : locationMarkerText;
    return (
       <div style={style}>
          <span style={style_span}>{this.props.text}</span>
       </div>
    );
  }
}

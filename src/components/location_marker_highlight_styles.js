const K_SIZE = 5;

const locationMarker = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  width: K_SIZE,
  height: K_SIZE,
  left: -K_SIZE / 2,
  top: -K_SIZE / 2,

  border: '1px solid #b39457',
  borderRadius: 6,
  backgroundColor: '#ffefb1',
  padding: 5,
  cursor: 'pointer'
};

const locationMarkerHighlight = {
  ...locationMarker,
  border: '1px solid #ff2222',
  backgroundColor: '#ff6666'
};

const locationMarkerText = {
  color: '#000',
  fontSize: 13,
  padding: 4,
  cursor: 'pointer',
  display: 'block',
  width: '300px',
  marginTop: '-11px',
  marginLeft: '7px'
};

const locationMarkerTextHighlight = {
  ...locationMarkerText
};

export {locationMarker, locationMarkerHighlight, locationMarkerText, locationMarkerTextHighlight, K_SIZE};

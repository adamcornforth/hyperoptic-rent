const K_SIZE = 5;

const locationMarker = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  width: K_SIZE,
  height: K_SIZE,
  left: -K_SIZE / 2,
  top: -K_SIZE / 2,

  border: '1px solid #fff',
  borderRadius: K_SIZE + 3,
  backgroundColor: '#ca1a1a',
  padding: 1,
  cursor: 'pointer'
};

const locationMarkerHover = {
  ...locationMarker,
  border: '5px solid #3f51b5',
  color: '#fff'
};

const locationMarkerText = {
  color: '#000',
  fontSize: 13,
  padding: 4,
  cursor: 'pointer',
  display: 'block',
  width: '300px',
  marginTop: '-9px',
  marginLeft: '7px'
};

const locationMarkerHoverText = {
  ...locationMarkerText,
};

export {locationMarker, locationMarkerHover, locationMarkerText, locationMarkerHoverText, K_SIZE};

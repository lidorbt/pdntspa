import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 32.182292,
      lng: 34.897132
    },
    zoom: 8
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyC5M0Hjn_nm0OzKVQlN2ZJcPjHtMqPt6yg' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}>
          <AnyReactComponent
            lat={32.182292}
            lng={34.897132}
            text="Test Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;

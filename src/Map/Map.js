import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { withStyles } from '@material-ui/core';
import { width, height } from '@material-ui/system';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const styles = (theme) => ({
  map: {
    width: '100%',
    height: '100%'
  }
})

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 32.182292,
      lng: 34.897132
    },
    zoom: 8
  };

  render() {
    const { classes } = this.props

    return (
      // Important! Always set the container height explicitly
      <div className={classes.map}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAiFGsLw67PFw-PUzV9MVaiuKhSdcM_GhQ' }}
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

export default withStyles(styles)(Map);

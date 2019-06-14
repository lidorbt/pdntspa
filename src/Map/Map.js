import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { withStyles } from '@material-ui/core';

import * as userApi from './users-data-api';
import Marker from './Marker';

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

  constructor(){
    super();
    this.state = {
      savedPlaces: []
    }
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount(){
    userApi.getAllUser().then((result) => {
      const places = [];
      const responseUsers = result.users;
      for(let userId in responseUsers){
          const data = responseUsers[userId];
          places.push({data, "key": userId});
      }
  
      this.setState({savedPlaces: places});
    });
  }

  render() {
    const { classes } = this.props

    const placesMarkers = this.state.savedPlaces.map((place) =>  
    <Marker
      lat={place.data.lat}
      lng={place.data.lng}
      text={place.data.title}
      key={place.key}
      isUser={place.data.isUser} />  
  );

    return (
      // Important! Always set the container height explicitly
      <div className={classes.map}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAiFGsLw67PFw-PUzV9MVaiuKhSdcM_GhQ' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onClick={this.onClick} >
            {placesMarkers}
        </GoogleMapReact>
      </div>
    );
  }

  onClick(t){
    const places = this.state.savedPlaces;
    places.push({data:{lat:t.lat, lng:t.lng}, key:t.lat*t.lng});
    this.setState({savedPlaces: places});
  }
}

export default withStyles(styles)(Map);

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import { withStyles } from '@material-ui/core';
import Swal from 'sweetalert2'
import * as userApi from './users-data-api';
import Marker from './Marker';
import AddPlaceDialog from './AddPlaceDialog';

import firebase from 'firebase';

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
      savedPlaces: [],
      isShown: false,
      savingPlace: null
    }
    this.onClick = this.onClick.bind(this);
    this.updateMyLoc();
  }

  validateSignIn = () => {
    if(!sessionStorage.getItem('CurrentUser')){
      Swal.fire({
        title: 'You have to sign in',
        text: "You have to sign in",
        type: 'error',
        confirmButtonColor: '#e72900',
        confirmButtonText: 'Ok'
      }).then((result) => {
        let { history } = this.props;
        history.push({
         pathname: '/somepage',
        });
      })
    }
  }

  componentDidMount(){
    // this.validateSignIn()
    
    this.updateData();
  }

  render() {
    const { classes } = this.props

    const placesMarkers = this.state.savedPlaces.map((place) =>  
    <Marker
      lat={place.data.lat}
      lng={place.data.lng}
      text={place.data.title}
      key={place.key}
      isUser={place.data.isUser}
      fileName={place.data.fileName} />  
  );

    return (
      // Important! Always set the container height explicitly
      <div className={classes.map}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyATX9F6uqoaJcF04txbei6s7gLpZe5DHHA' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onClick={this.onClick} >
            {placesMarkers}
        </GoogleMapReact>
        <AddPlaceDialog isShown={this.state.isShown} 
          onClose={this.onCloseDialog.bind(this)}
          onSave={this.onSavePlace.bind(this)}/>
      </div>
    );
  }

  onClick(t){
    this.setState({isShown: true, savingPlace: t});
  }

  updateData(){
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

  updateMyLoc(){
    if(window.localStorage.getItem("userName")){
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
          const logedUser = this.state.savedPlaces.find((x) => x.data.userName === window.localStorage.getItem("userName"))
          if(logedUser){
            userApi.updateMyLocation(position,logedUser.key).then(response => {
              this.updateData();          
            });
          }else{
            userApi.insertNewUser(position, window.localStorage.getItem("userName")).then(response => {
              this.updateData();          
            });
          }
        });
      }
    }
  }

  onCloseDialog(){
    this.setState({isShown:false});
  }

  onSavePlace(title, uploadFile){
    this.onCloseDialog(); 
    const {lat, lng} = this.state.savingPlace; 

    let storageRef = firebase.storage().ref().child(uploadFile.name);
    storageRef.put(uploadFile);

    userApi.AddPlace(title, lat, lng, uploadFile.name).then((response) => {
        this.updateData();
    });
  }
}

export default withRouter(withStyles(styles)(Map));

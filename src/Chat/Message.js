import React, {Component} from 'react';
import '../App.css';
import firebase from 'firebase';

export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: ''
    };
  }
  componentDidMount() {
    if(this.props.message.data.isFile){
      this.downloadFile(this.props.message.data.message);
    }
  }
  downloadFile = async (fileName) => {
    let fileUrl;
    fileUrl = await firebase.storage().ref().child(fileName).getDownloadURL();
    //let storage = firebase.storage().ref().child(fileName).getDownloadURL().then(function(url) {
      //console.log(url);
    //  fileUrl = url;
  //     var xhr = new XMLHttpRequest();
  // xhr.responseType = 'blob';
  // xhr.onload = function(event) {
  //   var blob = xhr.response;
  // };
  // xhr.open('GET', url);
  // xhr.send();
    // });
    console.log(fileUrl);

    this.setState({ url: fileUrl });
  }

  render() {
    return (
      <div className="message">
        <span className="message__author">
            {this.props.message.data.userName? this.props.message.data.userName : 'Guest' }:
        </span>
        {this.props.message.data.isFile ? (<a href={this.state.url}>{this.props.message.data.message}</a>) : (this.props.message.data.message)}
      </div>
    )
  }
}
import React, { Component } from 'react';
import '../App.css';
import Message from './Message';
import firebase from 'firebase';

import * as messagesApi from './messages-data-api';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: this.props.user,
      message: '',
      list: [],
    };
    //this.messageRef = firebase.database().ref().child('messages');
    messagesApi.getAllMessages().then((result) => {
      const messages = [];
      const responseMessages = result.messages;
      for(let messagesId in responseMessages){
          const data = responseMessages[messagesId];
          messages.push({data, "key": messagesId});
      }


      // let rawFile = new XMLHttpRequest();
      // let myFile = rawFile.open('GET', require('D://Programming//Projects//Makeathon//pdntspa//src//Chat//try.txt'));
      // console.log(myFile);
      // messagesApi.uploadFile(myFile);
      
      this.setState({
        list: messages.sort((a, b) => {
          return a.data.sentDate - b.data.sentDate;
        }),
      });
    });

    //this.listenMessages();
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.user) {
      this.setState({'userName': nextProps.user.displayName});
    }
  }
  handleChange(event) {
    this.setState({message: event.target.value});
  }
  handleSend() {
    if (this.state.message) {
    //   let newItem = {
    //     userName: this.state.userName,
    //     message: this.state.message,
    //   }
    //   this.messageRef.push(newItem);
      let location;
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
          location = position;
        });
      }

      // fetch('D:\Programming\Projects\Makeathon\try').then(file => {
      //   console.log(file);
      //   messagesApi.uploadFile(file);
      // });
      messagesApi.sendMessage(this.state.userName, this.state.message, Date.now(), location, false);
      
      this.setState({ message: '' });
    }
  }
  handleKeyPress(event) {
    if (event.key !== 'Enter') return;
    this.handleSend();
  }

    filesUpload = (e) => {
      let files = e.target.files;
      let reader = new FileReader();
      //reader.readAsDataURL(files[0]);
      //messagesApi.uploadFile(files[0]);

     let storageRef = firebase.storage().ref().child(files[0].name);
     storageRef.put(files[0]);

     messagesApi.sendMessage(this.state.userName, files[0].name, Date.now(), null, true);

      // reader.onload = (e) => {
      //   console.log(e);
      //   messagesApi.uploadFile(e.target.result);
      // }
    };

  
//   listenMessages() {
//     this.messageRef
//       .limitToLast(10)
//       .on('value', message => {
//         this.setState({
//           list: Object.values(message.val()),
//         });
//       });
//   }
  render() {
    return (
      <div className="form">
        <div className="form__message">
          { this.state.list.map((item, index) =>
            <Message key={index} message={item} />
          )}
        </div>
        <div className="form__row">
          <input
            className="form__input"
            type="text"
            placeholder="Type message"
            value={this.state.message}
            onChange={this.handleChange.bind(this)}
            onKeyPress={this.handleKeyPress.bind(this)}
          />
          <button
            className="form__button"
            onClick={this.handleSend.bind(this)}
          >
            send
          </button>
          <input type="file" name="file" onChange={(e) =>this.filesUpload(e)}/>
        </div>
      </div>
    );
  }
}
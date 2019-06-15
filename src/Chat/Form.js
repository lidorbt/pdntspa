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
      
      this.setState({
        list: messages,
      });

      this.state.list.map((item, index) => {
          console.log(item);
          console.log(index);
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
      messagesApi.sendMessage(this.state.userName, this.state.message)
      
      this.setState({ message: '' });
    }
  }
  handleKeyPress(event) {
    if (event.key !== 'Enter') return;
    this.handleSend();
  }
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
        </div>
      </div>
    );
  }
}
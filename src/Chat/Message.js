import React, {Component} from 'react';
import '../App.css';

export default class Message extends Component {
  render() {
    return (
      <div className="message">
        <span className="message__author">
            {this.props.message.data.userName}:
        </span>
        {this.props.message.data.message}
      </div>
    )
  }
}
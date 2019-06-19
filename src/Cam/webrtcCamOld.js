import React, { Component } from "react";
import "./stam.css";
import RTCMultiConnection from 'rtcmulticonnection'

class webrtcCam extends Component {

  componentDidMount() {
    const connection = new RTCMultiConnection();
    connection.enableScalableBroadcast = true;
    connection.maxRelayLimitPerUser = 1;
    connection.autoCloseEntireSession = true;
    connection.socketMessageEvent = 'scalable-media-broadcast';

    document.getElementById("open-room").onclick = function() {
      connection.open(document.getElementById("room-id").value, function() {
        console.log('streaming on :',connection.sessionid);
      });
    };

    document.getElementById("join-room").onclick = function() {
      connection.sdpConstraints.mandatory = {
        OfferToReceiveAudio: true,
        OfferToReceiveVideo: true
      };

      connection.join(document.getElementById("room-id").value);
    };

    // connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';
    connection.socketURL = 'http://localhost:9001/';
    // connection.socketURL = 'https://webrtcweb.com:9002/';
    connection.socketMessageEvent = "video-broadcast-demo";
    connection.session = {
      audio: true,
      video: true,
      oneway: true
    };
    connection.sdpConstraints.mandatory = {
      OfferToReceiveAudio: false,
      OfferToReceiveVideo: false
    };

    connection.onstream = function(event) {
      alert('starts streaming')
      var mediaElement = document.querySelector('#video')
      mediaElement.srcObject = event.stream;
      mediaElement.onloadedmetadata = () => { mediaElement.play() }
      mediaElement.id = event.streamid;
    }

    connection.onstreamended = function(event) {
      var mediaElement = document.getElementById(event.streamid);
      if (mediaElement) {
        mediaElement.parentNode.removeChild(mediaElement);
        if (event.userid === connection.sessionid && !connection.isInitiator) {
          alert(
            "Broadcast is ended. We will reload this page to clear the cache."
          );
          window.location.reload();
        }
      }
    };
  }

  render() {
    return (
      <div>
        <section class="make-center">
          <input type="text" id="room-id" value='test' autocorrect="off" autocapitalize="off" size="20" />
          <button id="open-room">Open Room</button>
          <button id="join-room">Join Room</button>

          <video autoPlay id="video" width='500' height='500' style={{position: 'absolute', left: '200', top: '200', margin: '0 auto', width: '400px'}}></video>

          <div id="room-urls"/>
        </section>
      </div>
    );
  }
}

export default webrtcCam;

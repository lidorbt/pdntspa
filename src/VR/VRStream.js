import React, { Component, Fragment } from "react";
import sample from "../Assets/background.jpg";
import { withRouter } from "react-router-dom";
import Swal from "sweetalert2";
import RTCMultiConnection from "rtcmulticonnection";

class VRStream extends Component {

  componentDidMount() {
    const { broadcasters } = this.props

    // this.validateSignIn();

    // var enableRecordings = true;
    var connection = new RTCMultiConnection();
    connection.enableScalableBroadcast = true;
    connection.maxRelayLimitPerUser = 1;
    connection.autoCloseEntireSession = true;
    connection.socketURL = "https://10.118.109.136:9005/";
    // connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';
    connection.socketMessageEvent = "scalable-media-broadcast-demo";

    connection.connectSocket(function(socket) {
      socket.on("join-broadcaster", function(hintsToJoinBroadcast) {
        console.log("join-broadcaster", hintsToJoinBroadcast);
        connection.session = hintsToJoinBroadcast.typeOfStreams;
        connection.sdpConstraints.mandatory = {
          OfferToReceiveVideo: !!connection.session.video,
          OfferToReceiveAudio: !!connection.session.audio
        };
        connection.broadcastId = hintsToJoinBroadcast.broadcastId;
        connection.join(hintsToJoinBroadcast.userid);
      });

      socket.on("rejoin-broadcast", function(broadcastId) {
        console.log("rejoin-broadcast", broadcastId);
        connection.attachStreams = [];
        socket.emit("check-broadcast-presence", broadcastId, function(
          isBroadcastExists
        ) {
          if (!isBroadcastExists) {
            // the first person (i.e. real-broadcaster) MUST set his user-id
            connection.userid = broadcastId;
          }
          socket.emit("join-broadcast", {
            broadcastId: broadcastId,
            userid: connection.userid,
            typeOfStreams: connection.session
          });
        });
      });

      socket.on("broadcast-stopped", function(broadcastId) {
        console.error("broadcast-stopped", broadcastId);
        alert("This broadcast has been stopped.");
      });

      socket.on("start-broadcasting", function(typeOfStreams) {
        Swal.fire({
          title: `There's no such broadcast id`,
          text: `There's no such broadcast id, wait for`,
          type: 'error',
          confirmButtonColor: '#e72900',
          confirmButtonText: 'Ok'
        }) 
      });
    });

    var videoPreview = document.getElementById("stream1");
    connection.onstream = function(event) {
      if (connection.isInitiator && event.type !== "local") {
        return;
      }
      connection.isUpperUserLeft = false;
      videoPreview.srcObject = event.stream;
      videoPreview.onloadedmetadata = () => {
        videoPreview.play();
      };
      videoPreview.userid = event.userid;
      if (event.type === "local") {
        videoPreview.muted = true;
      }
      if (connection.isInitiator === false && event.type === "remote") {
        // he is merely relaying the media
        connection.dontCaptureUserMedia = true;
        connection.attachStreams = [event.stream];
        connection.sdpConstraints.mandatory = {
          OfferToReceiveAudio: false,
          OfferToReceiveVideo: false
        };
        connection.getSocket(function(socket) {
          socket.emit("can-relay-broadcast");
          if (connection.DetectRTC.browser.name === "Chrome") {
            connection.getAllParticipants().forEach(function(p) {
              if (p + "" !== event.userid + "") {
                var peer = connection.peers[p].peer;
                peer.getLocalStreams().forEach(function(localStream) {
                  peer.removeStream(localStream);
                });
                event.stream.getTracks().forEach(function(track) {
                  peer.addTrack(track, event.stream);
                });
                connection.dontAttachStream = true;
                connection.renegotiate(p);
                connection.dontAttachStream = false;
              }
            });
          }
          if (connection.DetectRTC.browser.name === "Firefox") {
            connection.getAllParticipants().forEach(function(p) {
              if (p + "" !== event.userid + "") {
                connection.replaceTrack(event.stream, p);
              }
            });
          }
        });
      }
      localStorage.setItem(connection.socketMessageEvent, connection.sessionid);
    };
    
    document.getElementById("join").onclick = function() {
      var broadcastId = document.getElementById("broadcast-id").value;
      if (broadcastId.replace(/^\s+|\s+$/g, "").length <= 0) {
        alert("Please enter broadcast-id");
        return;
      }
      document.getElementById("join").disabled = true;
      connection.extra.broadcastId = broadcastId;
      connection.session = {
        audio: true,
        video: true,
        oneway: true
      };
      connection.getSocket(function(socket) {
        socket.emit("check-broadcast-presence", broadcastId, function(
          isBroadcastExists
        ) {
          if (!isBroadcastExists) {
            // the first person (i.e. real-broadcaster) MUST set his user-id
            connection.userid = broadcastId;
          }
          console.log("check-broadcast-presence", broadcastId, isBroadcastExists);
          socket.emit("join-broadcast", {
            broadcastId: broadcastId,
            userid: connection.userid,
            typeOfStreams: connection.session
          });
        });
      });
    };

    connection.onstreamended = function() {};
    connection.onleave = function(event) {
      if (event.userid !== videoPreview.userid) return;
      connection.getSocket(function(socket) {
        socket.emit("can-not-relay-broadcast");
        connection.isUpperUserLeft = true;
        if (allRecordedBlobs.length) {
          // playing lats recorded blob
          var lastBlob = allRecordedBlobs[allRecordedBlobs.length - 1];
          videoPreview.src = URL.createObjectURL(lastBlob);
          videoPreview.play();
          allRecordedBlobs = [];
        } else if (connection.currentRecorder) {
          var recorder = connection.currentRecorder;
          connection.currentRecorder = null;
          recorder.stopRecording(function() {
            if (!connection.isUpperUserLeft) return;
            videoPreview.src = URL.createObjectURL(recorder.getBlob());
            videoPreview.play();
          });
        }
        if (connection.currentRecorder) {
          connection.currentRecorder.stopRecording();
          connection.currentRecorder = null;
        }
      });
    };
    var allRecordedBlobs = [];

    var broadcastId = "";
    if (localStorage.getItem(connection.socketMessageEvent)) {
      broadcastId = localStorage.getItem(connection.socketMessageEvent);
    } else {
      broadcastId = connection.token();
    }
    var txtBroadcastId = document.getElementById("broadcast-id");
    txtBroadcastId.value = broadcastId;
    txtBroadcastId.onkeyup = txtBroadcastId.oninput = txtBroadcastId.onpaste = function() {
      localStorage.setItem(connection.socketMessageEvent, this.value);
    };

    document.querySelector("#broadcast-id").value = broadcasters[0]
    document.querySelector("#join").click()
  }

  validateSignIn = () => {
    if (!sessionStorage.getItem("CurrentUser")) {
      Swal.fire({
        title: "You have to sign in",
        text: "You have to sign in",
        type: "error",
        confirmButtonColor: "#e72900",
        confirmButtonText: "Ok"
      }).then(result => {
        let { history } = this.props;
        history.push({
          pathname: "/somepage"
        });
      });
    }
  };

  render() {
    return (
      <Fragment>
        <input type="text" hidden id="broadcast-id" autocorrect="off" autocapitalize="off" size="20" />
        <button id="join" hidden/>
        <a-scene canvas="" keyboard-shortcuts="" vr-mode-ui="">
          <a-assets>
            <img id="stream-gallery" alt="123" src={sample} />
            <video
              id="stream1"
              preload="auto"
              loop
              autoPlay
              width="160"
              height="90"
              controls=""
              crossorigin="true"
              webkit-playsinline=""
            />
          </a-assets>
          <a-entity position="0 2.0 0" rotation="" scale="" visible="">
            <a-entity camera look-controls>
              <a-camera>
                <a-cursor>
                  <a-animation
                    id="stream-mouseenter"
                    begin="cursor-mouseenter"
                    easing="ease-in"
                    attribute="scale"
                    fill="forwards"
                    from="1 1 1"
                    to="5 5 5"
                  />
                  <a-animation
                    id="stream-mouseenter"
                    begin="cursor-mouseenter"
                    easing="ease-in"
                    attribute="material.opacity"
                    fill="forwards"
                    from="1"
                    to="0"
                  />
                  <a-animation
                    id="stream-mouseleave"
                    begin="cursor-mouseleave"
                    easing="ease-in"
                    attribute="scale"
                    fill="forwards"
                    from="0.1 0.1 0.1"
                    to="1 1 1"
                  />
                  <a-animation
                    id="stream-mouseleave"
                    begin="cursor-mouseleave"
                    easing="ease-in"
                    attribute="material.opacity"
                    fill="forwards"
                    from="0"
                    to="1"
                  />
                </a-cursor>
              </a-camera>
            </a-entity>
          </a-entity>
          <a-sky
            src="#stream-gallery"
            rotation="0 -180 -2.4"
            material=""
            geometry=""
            scale=""
            position=""
            visible=""
          />

<a-entity
            data-video-source="stream1"
            class="soccer-video"
            geometry="primitive: plane; width: 28.4; height: 16;"
            position="0 11 -68"
            rotation="0 0 0"
            material="color: #FFFFFF; shader: flat; src: #stream1"
            scale=""
            visible=""
          />

        </a-scene>
      </Fragment>
    );
  }
}
export default withRouter(VRStream);

import React, { Component } from 'react'

export const CANVAS_WIDTH = 480
export const CANVAS_HEIGHT = 480
export const FPS = 10
export const PORT = 3001

class Cam extends Component {
  componentDidMount(){
    const video = document.querySelector('#video-canvas')

    // request access to webcam
    navigator.mediaDevices.getUserMedia({video: {width: 426, height: 240}}).then((stream) => video.srcObject = stream);
    const getFrame = () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      const data = canvas.toDataURL('image/png');
      return data;
    }

    const WS_URL = window.location.origin.replace(/^https/, 'wss').replace(/^http/, 'ws').replace('3000', PORT)
    const ws = new WebSocket(WS_URL)
    ws.onopen = () => {
      console.log(`Connected to ${WS_URL}`);
      setInterval(() => {
          ws.send(getFrame());
      }, 1000 / FPS);
    }
  }


  render() {
    return (
      <video id="video-canvas" autoPlay></video>
    )
  }
}

export default Cam

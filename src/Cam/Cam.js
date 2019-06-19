import React, { Component } from 'react'

export const CANVAS_WIDTH = 640
export const CANVAS_HEIGHT = 480
export const FPS = 75
export const PORT = 3001

class Cam extends Component {
  componentDidMount(){
    let record;
    const video = document.querySelector('#video-canvas')

    // request access to webcam
    // navigator.mediaDevices.getUserMedia({video: {width: CANVAS_WIDTH, height: CANVAS_HEIGHT}}).then(stream => record = stream)
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => { record = stream})
    const updateFrame = () => {
      video.getContext('2d').drawImage(record, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    }

    const WS_URL = window.location.origin.replace(/^https/, 'ws').replace(/^http/, 'ws').replace(/^https/, 'ws').replace('3000', PORT)
    const ws = new WebSocket(WS_URL)
    ws.onopen = () => {
        console.log(`Connected to ${WS_URL}`)
        setInterval(() => {
            ws.send(record)
            updateFrame()
        }, 1000 / FPS)
    }
  }


  render() {
    return (
      <canvas id="video-canvas"></canvas>    
    )
  }
}

export default Cam

import React, { Component } from 'react'
import{CANVAS_WIDTH, CANVAS_HEIGHT, PORT} from '../Cam/Cam.js'

class StreamTest extends Component {

  componentDidMount() {
    const canvas = document.querySelector('#video-canvas')
        
    const WS_URL = window.location.origin.replace(/^https/, 'ws').replace(/^http/, 'ws').replace(/^https/, 'ws').replace('3000', PORT)
    const ws = new WebSocket(WS_URL)
    ws.onopen = () => console.log(`Connected to ${WS_URL}`)
    ws.onmessage = message => {
      canvas.getContext('2d').drawImage(message.data, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    }
  }

  render() {
    return (
      <canvas id="video-canvas"></canvas>    
    )
  }
}

export default StreamTest

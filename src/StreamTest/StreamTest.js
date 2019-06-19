import React, { Component } from 'react'
import{CANVAS_WIDTH, CANVAS_HEIGHT, PORT} from '../Cam/Cam.js'

class StreamTest extends Component {

  componentDidMount() {
    const video = document.querySelector('#video-canvas')
        
    const WS_URL = window.location.origin.replace(/^https/, 'ws').replace(/^http/, 'ws').replace('3000', PORT)
    const ws = new WebSocket(WS_URL)
    
    ws.onopen = () => console.log(`Connected to ${WS_URL}`)
    ws.onmessage = message => {
      debugger

      video.srcObject = message.data

      video.onloadedmetadata = (e) => { video.play() }
    }
  }

  render() {
    return (
      <video id="video-canvas"></video>    
    )
  }
}

export default StreamTest

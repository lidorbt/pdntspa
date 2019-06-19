import React, { Component } from 'react'
import{PORT} from '../Cam/Cam.js'

class StreamTest extends Component {

  componentDidMount() {
    const img = document.querySelector('#video-canvas')
        
    const WS_URL = window.location.origin.replace(/^https/, 'wss').replace(/^http/, 'ws').replace('3000', PORT)
    const ws = new WebSocket(WS_URL)
    ws.onopen = () => console.log(`Connected to ${WS_URL}`)
    ws.onmessage = message => {
      img.src = message.data;
    }
  }

  render() {
    return (
      <img id="video-canvas" />
    )
  }
}

export default StreamTest

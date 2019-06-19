import React, { Component } from 'react'

export const CANVAS_WIDTH = 480
export const CANVAS_HEIGHT = 480
export const FPS = 10
export const PORT = 3001

// navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

class Cam extends Component {
  constructor(props){
    super(props)

    this.state = {
      stream: undefined
    }
  }

  componentDidMount(){
    const video = document.querySelector('#video-canvas')
    
    const WS_URL = window.location.origin.replace(/^https/, 'ws').replace(/^http/, 'ws').replace('3000', PORT)
    const ws = new WebSocket(WS_URL)

    navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(stream => {
      if(!this.state.stream) this.setState({stream})
      debugger
      video.srcObject = stream;
      video.onloadedmetadata = () => { video.play() }
    })
    
    ws.onopen = () => {
        console.log(`Connected to ${WS_URL}`)
        setInterval(() => {
            console.log(this.state.stream)
            debugger
            ws.send(video.srcObject)
        }, 1000 / FPS)
    }
  }

  render() {
    return (
      <video autoPlay id="video-canvas"></video>    
    )
  }
}

export default Cam

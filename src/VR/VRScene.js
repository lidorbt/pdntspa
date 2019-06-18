import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import exampleImg from '../Assets/1_ZzXLECw49BJ6ck4Be0pygQ.jpeg'
import exampleVideo from '../Assets/360video.mp4'
require('aframe')

class VRScene extends Component {
  render() {
    return (
      <a-scene>
        <a-assets>
          <video id="video" autoplay loop crossorigin="anonymous">
            <source src={exampleVideo}></source>
          </video>
        </a-assets>

        <a-videosphere src="#video" rotation="0 180 0" autoplay></a-videosphere>


      </a-scene>
    );
  }
}

const styles = (theme) => ({
  root: {

  }
})

export default withStyles(styles)(VRScene)

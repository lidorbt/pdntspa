import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import exampleImg from '../Assets/1_ZzXLECw49BJ6ck4Be0pygQ.jpeg'

class VRImage extends Component {

  render() {
    return (
      <a-scene>
        <a-sky src={exampleImg} rotation="0 -130 0"></a-sky>
        <a-entity id="rig"
          movement-controls
          position="25 0 25">
          <a-entity camera
            position="0 1.6 0"
            look-controls="enabled: true; hmdEnabled:true; touchEnabled: false; pointerLockEnabled: true"></a-entity>
        </a-entity>
      </a-scene>
    );
  }
}

const styles = (theme) => ({
  root: {

  }
})

export default withStyles(styles)(VRImage)

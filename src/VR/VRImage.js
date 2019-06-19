import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';

class VRImage extends Component {
  render() {
      return this.props.imageUrl? (<a-scene>
          <a-sky src={this.props.imageUrl} rotation="0 -130 0"></a-sky>
          <a-entity id="rig"
            movement-controls
            position="25 0 25">
            <a-entity camera
              position="0 1.6 0"
              look-controls="enabled: true; hmdEnabled:true; touchEnabled: false; pointerLockEnabled: true"></a-entity>
          </a-entity>
        </a-scene>) :
        <div/>
    }
  }

const styles = (theme) => ({
  root: {

  }
})

export default withStyles(styles)(VRImage)

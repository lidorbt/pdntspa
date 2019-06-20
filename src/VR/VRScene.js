import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import backgroundImg from "../Assets/background.jpg";
// import exampleVideo from "../Assets/360video.mp4";

class VRScene extends Component {
  render() {
    return (
      <a-scene>
        <a-camera >
          <a-cursor></a-cursor>
        </a-camera>

        <a-assets>
          <img id="sky" src={backgroundImg} alt='background'/>
        </a-assets>
        <a-sky src="#sky" repeat={4}></a-sky>

        <a-assets>
          <video id="video1" autoPlay position={'0 2.2 -2'}  width="2" height="1.2" crossOrigin="anonymous">
            <source src={'https://www.w3schools.com/html/mov_bbb.mp4'} />
          </video>
        </a-assets>
 
        <a-videosphere src="#video1" rotation="0 180 0" ></a-videosphere>


        {/* <a-video src={'https://www.w3schools.com/html/mov_bbb.mp4'} position={'0 2.2 -2'}  width="2" height="1.2" autoPlay></a-video> */}

      </a-scene>
    );
  }
}

const styles = theme => ({
  root: {}
});

export default withStyles(styles)(VRScene);

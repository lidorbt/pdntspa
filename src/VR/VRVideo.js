import React, { Component } from 'react';
import exampleVideo from '../Assets/360video.mp4'

class VRVideo extends Component {
  // componentDidMount() {
  //   // var scene = document.querySelector("a-scene");
  //   // var vid = document.querySelector("#video");
  //   // if (scene.hasLoaded) {
  //   //   vid.play()
  //   // } else {
  //   //   scene.addEventListener("loaded", () => { vid.play() });
  //   // }

  //   const AFRAME = window.AFRAME
  //   AFRAME.registerComponent('cursor-listener', {
  //     init: () => {
  //       var lastIndex = -1;
  //       var COLORS = ['red', 'green', 'blue'];
  //       this.el.addEventListener('click', function (evt) {
  //         lastIndex = (lastIndex + 1) % COLORS.length;
  //         this.setAttribute('material', 'color', COLORS[lastIndex]);
  //         console.log('I was clicked at: ', evt.detail.intersection.point);
  //       });
  //     }
  //   });
  // }



  render() {
    return (
      <a-scene>
        <a-camera >
          <a-cursor></a-cursor>
        </a-camera>

        <a-assets>
          <video id="video" autoPlay muted loop crossOrigin="anonymous">
            <source src={exampleVideo} />
          </video>
        </a-assets>
        {/*<a-assets>
        <video id="video" autoplay loop="true" src={exampleVideo}></video>
      </a-assets>

      <a-video src="#video" width="16" height="9" position="0 0 -20"></a-video>*/}

        <a-videosphere src="#video" rotation="0 180 0"></a-videosphere>
      </a-scene>
    );
  }
}

export default VRVideo

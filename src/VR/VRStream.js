import React, { Component, Fragment } from 'react';
import sample from '../Assets/1_ZzXLECw49BJ6ck4Be0pygQ.jpeg'

class VRStream extends Component {
  render() {
    return (
      <Fragment>
        <a-scene canvas="" keyboard-shortcuts="" vr-mode-ui="">
          <a-assets>
            <img id="stadium" alt='123' src={sample} />
            <video id="game1" preload="auto" src="videos/71270683/71270683.mp4" width="160" height="90" controls="" crossorigin="true" webkit-playsinline=""></video>
            <video id="game2" preload="auto" src="videos/63916604/63916604.mp4" width="160" height="90" controls="" crossorigin="true" webkit-playsinline=""></video>
            <video id="game3" preload="auto" src="https://s3-us-west-1.amazonaws.com/www.rickroulette.com/rickroll.mp4" width="160" height="90" controls="" crossorigin="true" webkit-playsinline=""></video>
          </a-assets>
          <a-entity position="0 2.0 0" rotation="" scale="" visible="">
            <a-entity camera="" look-controls="" position="" rotation="" scale="" visible="">
              <a-cursor color="#ffffff" material="" raycaster="" cursor="" geometry="" position="" rotation="" scale="" visible="">
                <a-animation begin="cursor-mouseenter" easing="ease-in" attribute="scale" fill="forwards" from="1 1 1" to="0.1 0.1 0.1"></a-animation>
                <a-animation begin="cursor-mouseenter" easing="ease-in" attribute="material.opacity" fill="forwards" from="1" to="0"></a-animation>
                <a-animation begin="cursor-mouseleave" easing="ease-in" attribute="scale" fill="forwards" from="0.1 0.1 0.1" to="1 1 1"></a-animation>
                <a-animation begin="cursor-mouseleave" easing="ease-in" attribute="material.opacity" fill="forwards" from="0" to="1"></a-animation>
              </a-cursor>
            </a-entity>
          </a-entity>
          <a-sky src="#stadium" rotation="0 -180 -2.4" material="" geometry="" scale="" position="" visible=""></a-sky>
          <a-cylinder position="0 0 0" radius="1" height="1" color="#7BC8A4" material="" geometry="" rotation="" scale="" visible=""></a-cylinder>
          <a-entity data-video-source="game1" class="soccer-video" geometry="primitive: plane; width: 28.4; height: 16;" position="-35 11 -60" rotation="0 35 0" material="color: #FFFFFF; shader: flat; src: #game1" scale="" visible=""></a-entity>
          <a-entity data-video-source="game2" class="soccer-video" geometry="primitive: plane; width: 28.4; height: 16;" position="0 11 -68" rotation="0 0 0" material="color: #FFFFFF; shader: flat; src: #game2" scale="" visible=""></a-entity>
          <a-entity data-video-source="game3" class="soccer-video" geometry="primitive: plane; width: 28.4; height: 16;" position="35 11 -60" rotation="0 -35 0" material="color: #FFFFFF; shader: flat; src: #game3" scale="" visible=""></a-entity>
          <a-entity light="" data-aframe-default-light="" position="" rotation="" scale="" visible=""></a-entity><a-entity light="" position="" data-aframe-default-light="" rotation="" scale="" visible="">
          </a-entity>
          <canvas class="a-canvas" data-aframe-default="true" width="2560" height="937" />
          <div class="a-enter-vr" data-a-enter-vr-no-headset="" data-a-enter-vr-no-webvr="">
            <button class="a-enter-vr-button"></button><div class="a-enter-vr-modal">
              <p>Your browser does not support WebVR. To enter VR, use a VR-compatible browser or a mobile phone.</p>
              <a href="http://mozvr.com/#start" target="_blank">Learn more.</a>
            </div>
          </div>
          <div class="a-orientation-modal a-hidden">
            <button>Exit VR</button>
          </div>
        </a-scene>
      </Fragment>
    );

  }
}
export default VRStream

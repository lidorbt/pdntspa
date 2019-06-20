import React, { Component, Fragment } from 'react';
import sample from '../Assets/background.jpg'
import {withRouter} from 'react-router-dom'
import Swal from 'sweetalert2'

class VRStream extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }

    componentDidMount(){
      this.validateSignIn()
    }

  validateSignIn = () => {
    if(!sessionStorage.getItem('CurrentUser')){
      Swal.fire({
        title: 'You have to sign in',
        text: "You have to sign in",
        type: 'error',
        confirmButtonColor: '#e72900',
        confirmButtonText: 'Ok'
      }).then((result) => {
        let { history } = this.props;
        history.push({
         pathname: '/somepage',
        });
      })
    }
  }


  render() {
    return (
      <Fragment>
        <a-scene canvas="" keyboard-shortcuts="" vr-mode-ui="">
          <a-assets>
            <img id="stream-gallery" alt='123' src={sample} />
            <video id="stream1" preload="auto" src="https://s3-us-west-1.amazonaws.com/www.rickroulette.com/rickroll.mp4" loop autoPlay width="160" height="90" controls="" crossorigin="true" webkit-playsinline=""></video>
            <video id="stream2" preload="auto" src="https://s3-us-west-1.amazonaws.com/www.rickroulette.com/rickroll.mp4" loop autoPlay width="160" height="90" controls="" crossorigin="true" webkit-playsinline=""></video>
            <video id="stream3" preload="auto" src="https://s3-us-west-1.amazonaws.com/www.rickroulette.com/rickroll.mp4" loop autoPlay width="160" height="90" controls="" crossorigin="true" webkit-playsinline=""></video>
          </a-assets>
          <a-entity position="0 2.0 0" rotation="" scale="" visible="">
            <a-entity camera look-controls>
            <a-camera >
              <a-cursor>

                <a-animation id="stream-mouseenter" begin="cursor-mouseenter" easing="ease-in" attribute="scale" fill="forwards" from="1 1 1" to="5 5 5" ></a-animation>
                <a-animation id="stream-mouseenter" begin="cursor-mouseenter" easing="ease-in" attribute="material.opacity" fill="forwards" from="1" to="0"></a-animation>
                <a-animation id="stream-mouseleave" begin="cursor-mouseleave" easing="ease-in" attribute="scale" fill="forwards" from="0.1 0.1 0.1" to="1 1 1"></a-animation>
                <a-animation id="stream-mouseleave" begin="cursor-mouseleave" easing="ease-in" attribute="material.opacity" fill="forwards" from="0" to="1"></a-animation>
                
              </a-cursor>
              </a-camera>

            </a-entity>
          </a-entity>
          <a-sky src="#stream-gallery" rotation="0 -180 -2.4" material="" geometry="" scale="" position="" visible=""></a-sky>

          <a-cylinder position="0 0 0" radius="1" height="1" color="#7BC8A4" material="" geometry="" rotation="" scale="" visible=""></a-cylinder>

          <a-entity data-video-source="stream1" class="soccer-video" geometry="primitive: plane; width: 28.4; height: 16;" position="-35 11 -60" rotation="0 35 0" material="color: #FFFFFF; shader: flat; src: #stream1" scale="" visible=""></a-entity>
          <a-entity data-video-source="stream2" class="soccer-video" geometry="primitive: plane; width: 28.4; height: 16;" position="0 11 -68" rotation="0 0 0" material="color: #FFFFFF; shader: flat; src: #stream2" scale="" visible=""></a-entity>
          <a-entity data-video-source="stream3" class="soccer-video" geometry="primitive: plane; width: 28.4; height: 16;" position="35 11 -60" rotation="0 -35 0" material="color: #FFFFFF; shader: flat; src: #stream3" scale="" visible=""></a-entity>
          {/* <a-entity light="" data-aframe-default-light="" position="" rotation="" scale="" visible=""></a-entity>
          <a-entity light="" position="" data-aframe-default-light="" rotation="" scale="" visible=""></a-entity> */}
        </a-scene>
      </Fragment>
    );

  }
}
export default withRouter(VRStream)

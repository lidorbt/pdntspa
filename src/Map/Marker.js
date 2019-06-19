import React, {Component} from 'react';
import firebase from 'firebase';

import VRImage from '../VR/VRImage';


 class Marker extends Component
 {   
    constructor(props){
        super(props);

        let src = "https://img.icons8.com/office/16/000000/marker.png";        
        if(!props.isUser)
        {
            src = "https://img.icons8.com/ultraviolet/16/000000/marker.png";        
        } 
        this.state = {fileUrl:null, imgSrc: src};
    }
    
    async openImageInVR(){
        if(this.props.fileName){
            const fileUrl = await firebase.storage().ref().child(this.props.fileName).getDownloadURL();
            this.setState({fileUrl: fileUrl});
        }
    }

    render(){
        return (
            <div onClick={() => this.openImageInVR()}>
                <img src={this.state.imgSrc} />
                {this.props.text}
                <VRImage imageUrl={this.state.fileUrl} />
            </div>
        );
    }
 };

 export default Marker;

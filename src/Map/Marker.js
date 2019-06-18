import React from 'react';

 const Marker = ({ text, isUser }) => 
 {   
    let src = "https://img.icons8.com/office/16/000000/marker.png";
    if(!isUser)
    {
        src = "https://img.icons8.com/ultraviolet/16/000000/marker.png";        
    }

    return (
        <div>
            <img src={src} />
            {text}
        </div>
    );
 };

 export default Marker;

import React from 'react';
import "./css/ChipFieldComponent.css";

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

export default function ChipFieldComponent(props) {
    const rgb = hexToRgb(props.color);
    return(
        
        <div className={"chip-field"} style={{backgroundColor: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`}}>
            <div className={"chip"} style={{color: props.color}}>
                {props.title}
            </div>
        </div>
    )
}
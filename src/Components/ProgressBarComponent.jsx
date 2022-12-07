import React from 'react';
import {AiOutlineUnorderedList} from "react-icons/ai"; 
import "./css/ProgressBarComponent.css";

export default function ProgressBarComponent(props) {
    const width = 100;
    return(
        <div className={"progress-bar-div"}>
            <div className="flex justify-between mb-1">
                <p className={"progress-bar-text"}><AiOutlineUnorderedList size={15} /> Progress</p>
                <p className={"progress-bar-percentage"}>{props.progress}%</p>
            </div>
            <div className={"progress-bar bg-[#F5F5F5]"} style={{width: width + "%", maxWidth: "100%"}}>
                <div className={`h-1 rounded-full ${(width / 100 * props.progress) === 100 ? "bg-[#F5761A]" : "bg-[#F5761A]"}`} style={{width: (width / 100 * props.progress) + "%", maxWidth: "100%"}}></div>
            </div>
        </div>
    )
}
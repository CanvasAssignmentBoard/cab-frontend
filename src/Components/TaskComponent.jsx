import React from 'react';
import "./css/TaskComponent.css";
import { HiOutlineAnnotation } from "react-icons/hi";
import { HiPaperClip } from "react-icons/hi2";
import { CiCircleMore } from "react-icons/ci";
import ChipFieldComponent from "./ChipFieldComponent";

export default function taskComponent(task) {

    function deadlineColor(date) {
        const currentDate = new Date();
        const deadlineDate = new Date(date);
        const difference = deadlineDate - currentDate;
        const differenceInDays = difference / (1000 * 3600 * 24);
        if (differenceInDays < 0) {
            return "#e3432d";
        } else if (differenceInDays < 7) {
            return "#F5761A";
        } else {
            return "#bdbdbd";
        }
    }

    return(
        <div className={"task-div inline-grid grid-cols-1"}>
            <div className={"task-name-div"}>
                <div>
                    <p className={"task-name"}>{task.task.name}</p>
                    <div className={"task-options"}>
                        <CiCircleMore size={26}/>
                    </div>
                </div>
                <p className={"task-parent"}>{task.task.parent}</p>
            </div>
            <div className={"task-progress-bar-div"}>
                <div className="flex justify-between mb-1">
                    <p className={"task-progress-text"}>Progress</p>
                    <p className={"task-progress-percentage"}>{task.task.progress}%</p>
                </div>
                <div className={"task-progress-bar"}>
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{width: task.task.progress + "%" }}></div>
                </div>
            </div>
            <div className={"task-bottom-div"}>
                <ChipFieldComponent title={task.task.deadlineDate} color={deadlineColor(task.task.deadlineDate)}/>
               <div className={"task-comments-uploads"}>
                   <HiOutlineAnnotation/>
                    <p className={"task-comments-uploads-text"}>{task.task.comments}</p>
                    <HiPaperClip/>
                    <p className={"task-comments-uploads-text"}>{task.task.uploads}</p>
               </div>
            </div>
        </div>
    )
}
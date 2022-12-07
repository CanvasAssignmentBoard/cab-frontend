import React, {useState} from 'react';
import "./css/AssignmentComponent.css";
import {IoMdArrowDropdown, IoMdArrowDropright} from "react-icons/io";
import ProgressBarComponent from './ProgressBarComponent';
import ChipFieldComponent from './ChipFieldComponent.jsx';
import { useContext } from 'react';
import {CourseContext} from "../Providers/CourseProvider";
import {TaskContext} from "../Providers/TaskProvider";
import ModalComponent from './ModalComponent';

function deadlineColor(date) {
    console.log(date);
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

export default function AssignmentComponent(props) {

    const [showModal, setShowModal] = useState(false);
    const courses = useContext(CourseContext);
    const tasks = useContext(TaskContext);

    if (courses === undefined || tasks === undefined) {
        return <></>;
    }

    const currentDate = new Date();
    const deadlineDate = new Date(props.assignment.due_at);

    console.log(props.assignment);
    console.log(deadlineDate);
    return (
        <>
        <div className={"assignment-div"} onClick={() => setShowModal(true)}>
            <div className={"assignment-header-div"}>
                <p className={"assignment-header-text"}>
                    {props.assignment.name}
                </p>
                <p className={"assignment-header-subtext"}>
                    {courses.find(course => course.id === props.assignment.course_id).name}
                </p>
            </div>
            <div className={"assignment-body-div"}>
                {tasks.length > 0 ? 
                    <ProgressBarComponent progress={Math.ceil((100 / tasks.length * tasks.filter(task => {
                        return task.status === "checked";
                    }).length))}/> 
                : <></>}
                { props.assignment.due_at != null ? <ChipFieldComponent title={deadlineDate.toISOString().split(/[T ]/i, 1)[0]} color={deadlineColor(props.assignment.dueDate)}/> : <></>}
            </div>
        </div>
        <ModalComponent modalHeader={props.assignment.name} showModal={showModal} setShowModal={setShowModal} onClose={() => setShowModal(false)}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <span className={"form-label"}>Description</span>
                <p className={"assignment-description "}>
                    {props.assignment.description}
                </p>
                <span className={"form-label"}>Course</span>
                <span className={"form-label"}>Status</span>
                <span className={"form-label"}>Submission type</span>
            </div>
        </ModalComponent>
        </>
    );
}


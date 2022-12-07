import React, {useState} from 'react';
import "./css/AssignmentComponent.css";
import {IoMdArrowDropdown, IoMdArrowDropright} from "react-icons/io";
import ProgressBarComponent from './ProgressBarComponent';
import ChipFieldComponent from './ChipFieldComponent.jsx';
import { useContext } from 'react';
import {CourseContext} from "../Providers/CourseProvider";
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

    const [selected, setSelected] = useState([0, 1, 2]);


    const handleToggle = React.useCallback((i) => {
        if(selected.includes(i)) {
            setSelected(selected => selected.splice(i, 1));
        } else {
            let newSelection = [...selected.push(i)];
            setSelected(newSelection);
        }
    }, [selected]);

    const currentDate = new Date();
    const deadlineDate = new Date(props.assignment.dueDate);

    return (
        <>
        <div className={"assignment-div"} onClick={() => setShowModal(true)}>
            <div className={"assignment-header-div"}>
                <p className={"assignment-header-text"}>
                    {props.assignment.name}
                </p>
                <p className={"assignment-header-subtext"}>
                    {courses.find(course => course.id === props.assignment.courseId).name}
                </p>
            </div>
            <div className={"assignment-body-div"}>
                <ProgressBarComponent progress={Math.ceil((100 / props.assignment.tasks.length * props.assignment.tasks.filter(task => {
                    return task.checked;
                }).length))}/>
                <ChipFieldComponent title={deadlineDate.toISOString().split(/[T ]/i, 1)[0]} color={deadlineColor(props.assignment.dueDate)}/>
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


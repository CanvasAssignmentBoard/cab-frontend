import React, {useState} from 'react';
import "./css/AssignmentComponent.css";
import {IoMdArrowDropdown, IoMdArrowDropright} from "react-icons/io";
import ProgressBarComponent from './ProgressBarComponent';
import ChipFieldComponent from './ChipFieldComponent.jsx';
import { useContext } from 'react';
import {CourseContext} from "../Providers/CourseProvider";

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
        <div className={"assignment-div"}>
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
        </>
    );
}

const dataStatus = [
    {
        id: 1,
        name: "To do"
    },
    {
        id: 2,
        name: "In progress"
    },
    {
        id: 3,
        name: "Done"
    }
];

const dataAssignment = [
    {
        id: 1,
        name: "Create Figma Prototype",
        parent: "OL-N22-CMK",
        category: "UI/UX Prototype",
        status: "To do",
        description: "Test description",
        tasks: [
            {
                id: 1,
                name: "Create basic layout",
                description: "Test description",
                checked: false,
            },
            {
                id: 1,
                name: "Create basic layout",
                description: "Test description",
                checked: false,
            },
        ],
        deadlineDate: "18 Nov 2022",
        comments: 0,
        uploads: 0
    },
    {
        id: 2,
        name : "Subquestion 3 - How is the current software designed?",
        parent: "INTERSHIP-COURSE",
        category: "Research Document",
        status: "To do", 
        description: "Test description",
        tasks: [
            {
                id: 1,
                name: "Create basic layout",
                description: "Test description",
                checked: false,
            },
        ],
        deadlineDate: "24 Dec 2022",
        comments: 0,
        uploads: 0
    },
    {
        id: 3,
        name : "b",
        parent: "INTERSHIP-COURSE",
        category: "",
        status: "In progress",
        description: "Test description",
        tasks: [
            {
                id: 1,
                name: "Create basic layout",
                description: "Test description",
                checked: false,
            },
            {
                id: 2,
                name: "Create basic layout",
                description: "Test description",
                checked: true,
            },
        ],
        deadlineDate: "24 Dec 2022",
        comments: 0,
        uploads: 0
    },
    {
        id: 4,
        name : "c",
        category: "",
        parent: "INTERSHIP-COURSE",
        status: "Done",
        description: "Test description",
        tasks: [
            {
                id: 1,
                name: "Create basic layout",
                description: "Test description",
                checked: true,
            },
        ],
        deadlineDate: "14 Nov 2022",
        comments: 0,
        uploads: 0
    }
];
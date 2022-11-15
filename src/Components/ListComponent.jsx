import React, {useState} from 'react';
import "./css/ListComponent.css";
import ColumnComponent from "./ColumnComponent";
import {IoMdArrowDropdown, IoMdArrowDropright} from "react-icons/io"
import { data } from 'autoprefixer';
import ProgressBarComponent from './ProgressBarComponent';
import ChipFieldComponent from './ChipFieldComponent';

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
export default function ListComponent() {

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

    return (
        <>
            <ul className="tasklist">
                {dataStatus.map((status, ci) => (
                    <li key={ci} className="tasklist-group text-sm">
                        <div className="tasklist-group-header" onClick={() => console.log(ci)}>
                            <div className="tasklist-group-header-title">
                                {status.name} ({dataAssignment.filter(assignment => assignment.status === status.name).length})
                            </div>
                            {selected.includes(ci) === true ? <IoMdArrowDropdown size={20}/> : <IoMdArrowDropright size={20}/>}
                        </div>
                        {selected.includes(ci) === true && (
                            <ul>
                                {dataAssignment.filter(assignment => {
                                    return assignment.status === status.name;
                                }).map((assignment, ai) => (
                                    <li key={ai} className="tasklist-item">
                                        <div className="tasklist-item-header">
                                            <div className="tasklist-item-title">
                                                {assignment.name}
                                            </div>
                                            <div className="tasklist-item-subtitle">
                                                {assignment.parent}
                                            </div>            
                                        </div>
                                        <div className="tasklist-item-content">
                                            <ProgressBarComponent progress={(100 / assignment.tasks.length * assignment.tasks.filter(task => {
                                                return task.checked;
                                            }).length)}/>
                                            <ChipFieldComponent title={assignment.deadlineDate} color={deadlineColor(assignment.deadlineDate)}/> 
                                            <div className="tasklist-item-actions">

                                            </div>  
                                        </div>
                                    </li>     
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
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
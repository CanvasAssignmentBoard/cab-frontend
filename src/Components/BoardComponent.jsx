import React, {useState, useEffect} from 'react';
import "./css/BoardComponent.css";
import ColumnComponent from "./ColumnComponent";

export default function BoardComponent() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    const taskArrayA = [
        {
            id: 1,
            parent: "OL-N22-CMK",
            name: "Create Figma Prototype",
            progress: 0,
            category: "UI/UX Prototype",
            status: "To do",
            description: "Test description",
            tasks: [
                {
                    id: 1,
                    name: "Create basic layout",
                    description: "Test description",
                    checked: true,
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
            progress: 0,
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
        }
    ];
    const taskArrayB = [{name: "b", description: "Test description", progress: 50, deadlineDate: "24 Dec 2022", parent: "INTERSHIP-COURSE", comments: 1,
        uploads: 2}];
    const taskArrayC = [{name: "c", description: "Test description", progress: 100, deadlineDate: "14 Nov 2022", parent: "INTERSHIP-COURSE", comments: 3,
        uploads: 4}];

    const getTaskCount = (taskArray) => {
        return(
            taskArray.length
        )
    };

    useEffect(() => {
        fetch("http://localhost:3000/board/1/1")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                }, 
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, []) 

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {

        return(
            <div data-testid="required-column-list" className={"board-div grid grid-cols-3 gap-4"}>
                <ColumnComponent
                    columnName={"🔵 To Do"}
                    taskCount={getTaskCount(taskArrayA)}
                    tasks={taskArrayA}
                />
                <ColumnComponent
                    columnName={"🔴 In Progress"}
                    taskCount={getTaskCount(taskArrayB)}
                    tasks={taskArrayB}
                />
                <ColumnComponent
                    columnName={"⚪ Done"}
                    taskCount={getTaskCount(taskArrayC)}
                    tasks={taskArrayC}
                />
            </div>
        )
    }
}
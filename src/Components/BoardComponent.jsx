import React, {useState, useEffect} from 'react';
import "./css/BoardComponent.css";
import ColumnComponent from "./ColumnComponent";

export default function BoardComponent() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);


    const taskArrayA = [{name: "Create Figma Prototype", parent: "UI/UX Prototype", description: "Test description", progress: 0, deadlineDate: "24 Dec 2022", comments: 0, uploads: 0}
    , {name: "d", description: "Test description"}];
    const taskArrayB = [{name: "b", description: "Test description"}];
    const taskArrayC = [{name: "c", description: "Test description"}];

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
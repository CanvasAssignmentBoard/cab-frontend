import React, {useState, useEffect} from 'react';
import "./css/BoardComponent.css";
import ColumnComponent from "./ColumnComponent";

export default function BoardComponent(board) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState();
    const [taskArrayA, setTaskArrayA] = useState([]);

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
        fetch(`http://localhost:3000/Board/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({boardID: board.board.id})
        })
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                    setTaskArrayA(result);
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
        return <div> Loading...</div>;
    } else {
console.log(items);
        return(
            <div data-testid="required-column-list" className={"board-div grid grid-cols-3 gap-4"}>
                <ColumnComponent
                    columnName={"🔵 To Do"}
                    taskCount={() => getTaskCount(items)}
                    tasks={taskArrayA}
                />
                <ColumnComponent
                    columnName={"🔴 In Progress"}
                    taskCount={() => getTaskCount(taskArrayB)}
                    tasks={taskArrayB}
                />
                <ColumnComponent
                    columnName={"⚪ Done"}
                    taskCount={() => getTaskCount(taskArrayC)}
                    tasks={taskArrayC}
                />
            </div>
        )
    }
}

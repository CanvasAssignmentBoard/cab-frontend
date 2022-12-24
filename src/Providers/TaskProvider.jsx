import React, {useEffect, useState, createContext} from 'react';

function GetTasks(assignmentId) {
    const [tasks, setTasks] = useState([]);
    
    const host = process.env.REACT_APP_API_HOST
    useEffect(() => {
        if (assignmentId === null || assignmentId === undefined) {
            return;
        }
        fetch(`${host}/task/${assignmentId}`)
            .then(response => response.json())
            .then(data => {
                setTasks(data);
            });
    }, [assignmentId, host]);

    // console.log(tasks);
    return tasks;
}

export const TaskContext = createContext();

export default function TaskProvider(props) {

    if (props.assignment == null) {
        return <></>;
    }

    const tasks = GetTasks(props.assignment.id);
    return (
        <TaskContext.Provider value={tasks}>
            {props.children}
        </TaskContext.Provider>
    );
}
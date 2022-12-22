import React, {useEffect, useState, createContext} from 'react';

function GetTasks(assignmentId, reloadTasks) {
    const [tasks, setTasks] = useState([]);
    
    const host = process.env.REACT_APP_API_HOST
    useEffect(() => {
        if ((assignmentId === null || assignmentId === undefined)) {
            return;
        }

        if (reloadTasks == false && tasks.length > 0) {
            return;
        }

        fetch(`${host}/task/${assignmentId}`)
            .then(response => response.json())
            .then(data => {
                setTasks(data);
            });
    }, [assignmentId, host, reloadTasks]);
    console.log(tasks);
    return tasks;
}

export const TaskContext = createContext();

// function setReloadTasks(assignmentID) {
//     console.log("test reload call");

// }

export default function TaskProvider(props) {

    const [reloadTasks, setReloadTasks] = useState(false);


    if (props.assignment == null) {
        return <></>;
    }

    let tasks = GetTasks(props.assignment.id, reloadTasks);

    // if (reloadTasks == true) {
    //     tasks = GetTasks(props.assignment.id)
    //     // setReloadTasks(false);
    // }

    return (
        <TaskContext.Provider value={{tasks: tasks, setReloadTasks: () => {setReloadTasks(true)}}} >
            {props.children}
        </TaskContext.Provider>
    );
}
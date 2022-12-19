import React, {useState, useEffect} from 'react';
import "./css/TaskComponent.css";
import ProgressBarComponent from "./ProgressBarComponent";
import { useContext } from 'react';
import {TaskContext} from "../Providers/TaskProvider";

function Task(props) {
    const [task, setTask] = useState(props.task);
    const [submit, setSubmit] = useState(false);
    const host = process.env.REACT_APP_API_HOST;

    useEffect(() => {
        if (submit) {
            fetch(`${host}/task/${task.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Name: task.name,
                    AssignmentId: props.assignment.id,
                    Status: task.status, 
                    DueDate: Date.now().toString()
                })  
            }).then(function(response) {
                    if (response.ok) {
                        console.log("Task updated");
                        fetch(`${host}/task/${props.assignment.id}`)
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                            props.setNewTasks(data);
                        });
                    } else {
                        console.log("Task update failed");
                    }
                    setSubmit(false);
                }
            );
        }
    }, [host, props, submit, task.id, task.name, task.status]);

    function submitTask(e) {
        console.log(e);
        task.status = (e.target.checked ? "checked" : "unchecked");
        const newTask = task;
        setTask(newTask);
        setSubmit(true);
    }


    return (
        <div className={"task-div"}>
            <div className={"task-checkbox-div"}>
                <input type="checkbox" defaultChecked={task.status == 'checked'} className={"task-checkbox"} onChange={(event) => submitTask(event)}/>
            </div>
            <TaskInput assignment={props.assignment} create={props.create} setNewTasks={props.setNewTasks} task={props.task} setTask={props.setTask}/>
        </div>
    )
}

function TaskInput(props) {
    const [submit, setSubmit] = useState(false);
    const host = process.env.REACT_APP_API_HOST

    useEffect(() => {
        if (submit) {
            if (props.task.create) {
                fetch(`${host}/task`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        Name: props.task.name,
                        AssignmentId: props.assignment.id,
                        Status: props.task.status, 
                        DueDate: Date.now().toString()
                    })
                }).then(function(response) {
                    if (response.ok) {
                        console.log("Task updated");
                        fetch(`${host}/task/${props.assignment.id}`)
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                            props.setNewTasks(data);
                        });
                    } else {
                        console.log("Task update failed");
                    }
                    setSubmit(false);
                    return response.json();
                }).then(data => {
                    console.log(data);
                    props.setTask(data);
                });         
            } else {
                fetch(`${host}/task/${props.task.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        Name: props.task.name,
                        AssignmentId: props.assignment.id,
                        Status: props.task.status, 
                        DueDate: Date.now().toString()
                    })
                }).then(function(response) {
                    if (response.ok) {
                        console.log("Task updated");
                        fetch(`${host}/task/${props.assignment.id}`)
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                            props.setNewTasks(data);
                        });
                    } else {
                        console.log("Task update failed");
                    }
                    setSubmit(false);
                });   
            }

            setSubmit(false);
        }   
    }, [host, props, submit])

    function updateTask(e) {
        props.task.name = e.nativeEvent.data;
        props.setTask(props.task);
    }

    function submitTask(e) {
        props.task.name = e.target.value;
        props.setTask(props.task);
        setSubmit(true);
    }

    return (
        <div className={"task-input-div"}>
            <input type="text" className={"task-input"} placeholder={"New task"} defaultValue={props.task.name} onBlur={(event) => submitTask(event)} onChange={(event) => updateTask(event)}/>
        </div>
    )
}

function TaskText(props) {
    return (
        <div className={"task-text-div"}>
            <p className={"task-text"}>
                {props.task.name}
            </p>
        </div>
    )
}

function TaskList(props) {
    return (
        <div className={"task-list-div"}>
            {props.tasks.map(task => {
                return (
                    <Task task={task} assignment={props.assignment} create={props.create} setNewTasks={props.setNewTasks}/>
                )
            })}
        </div>
    )
}

export default function TaskComponent(props) {
    const tasks = useContext(TaskContext);
    const [newTasks, setNewTasks] = useState(tasks);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (newTasks.length > 0) {
            setProgress(Math.ceil(100 / newTasks.length * newTasks.filter(task => {
                return task.status === "checked";
            }).length))
        }
    }, [newTasks]);

    if (tasks === undefined) {
        return <></>;
    }

    return (
        <div style={{marginTop: '2vh'}}>
            <ProgressBarComponent progress={progress}/> 
            <TaskList tasks={newTasks} assignment={props.assignment} setNewTasks={setNewTasks}/>
            <button
            type="button"
            className="inline-flex justify-center rounded-md border border-blue bg-white-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            style={{marginTop: '1vh', marginLeft: 'auto'}}
            onClick={() => { setNewTasks([...newTasks, {name: "", status: "unchecked", create: true}]) }}
            >
            + Task
            </button>
        </div>
    )
}
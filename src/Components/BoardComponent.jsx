import React from 'react';
import "./css/BoardComponent.css";
import ColumnComponent from "./ColumnComponent";

export default function BoardComponent() {

    const taskArrayA = [{name: "Create Figma Prototype", parent: "UI/UX Prototype", description: "Test description", progress: 0, deadlineDate: "24 Dec 2022", comments: 0, uploads: 0}
        , {name: "d", description: "Test description"}];
    const taskArrayB = [{name: "b", description: "Test description"}];
    const taskArrayC = [{name: "c", description: "Test description"}];

    const getTaskCount = (taskArray) => {
        return(
            taskArray.length
        )
    };

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
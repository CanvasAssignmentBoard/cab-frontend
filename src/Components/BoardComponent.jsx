import React from 'react';
import "./css/BoardComponent.css";
import ColumnComponent from "./ColumnComponent";

export default function BoardComponent() {

    const getTaskCount = (taskArray) => {
        return(
            taskArray.length
        )
    };

    return(
        <div className={"board-div grid grid-cols-3 gap-4"}>
            <ColumnComponent
                columnName={"🔵 To Do"}
                taskCount={getTaskCount(["a"])}
            />
            <ColumnComponent
                columnName={"🔴 In Progress"}
                taskCount={getTaskCount(["a"])}
            />
            <ColumnComponent
                columnName={"⚪ Done"}
                taskCount={getTaskCount(["a"])}
            />
        </div>
    )
}
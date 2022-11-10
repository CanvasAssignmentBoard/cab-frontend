import React from 'react';
import "./css/ColumnComponent.css";
import ColumnHeaderComponent from "./ColumnHeaderComponent";
import TaskComponent from "./TaskComponent";

export default function ColumnComponent(columnInfo) {

    const getTaskCount = (taskArray) => {
        return(
            taskArray.length
        )
    };

    return(
        <div className={"column-div"}>
            <ColumnHeaderComponent
                columnInfo={columnInfo.columnName}
                taskCount={columnInfo.taskCount}
            />
            <TaskComponent></TaskComponent>
        </div>
    )
}
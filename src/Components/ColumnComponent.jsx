import React from 'react';
import "./css/ColumnComponent.css";
import ColumnHeaderComponent from "./ColumnHeaderComponent";

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
        {/*BoardTasks*/}
        </div>
    )
}
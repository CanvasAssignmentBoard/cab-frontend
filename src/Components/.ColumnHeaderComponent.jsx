import React from 'react';
import "./css/ColumnHeaderComponent.css";

export default function ColumnHeaderComponent(columnInfo) {

    return(
        <div className={"column-header-div"}>
            <p className={"column-header-text"}>
                {columnInfo.columnInfo} ({columnInfo.taskCount})
            </p>
        </div>
    )
}
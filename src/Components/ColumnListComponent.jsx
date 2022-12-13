import React from 'react';
import "./css/ColumnListComponent.css";

export default function ColumnListComponent(props) {

    return (
        <div className={"column-container-list"}>
            <p className={"column-header-text"}>
                {props.columnName}
            </p>
            <div className={"column-div-list"}>
                {props.children}
            </div>
        </div>

    )
}
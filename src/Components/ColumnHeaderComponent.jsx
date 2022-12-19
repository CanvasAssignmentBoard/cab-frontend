import React from 'react';
import "./css/ColumnHeaderComponent.css";

export default function ColumnHeaderComponent(props) {

    return(
        <div className={"column-header-div"}>
            <p className={"column-header-text"}>
                {props.columnName}
            </p>
        </div>
    )
}
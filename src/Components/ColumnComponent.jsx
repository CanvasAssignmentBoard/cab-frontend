import React from 'react';
import "./css/ColumnComponent.css";

export default function ColumnComponent(props) {

    return(
        <div className={"column-div"}>
            <div className={"column-header-div"}>
                <p className={"column-header-text"}>
                    {props.columnName}
                </p>
            </div>
            {props.children}
        </div>
    )
}
import React from 'react';
import "./css/ColumnComponent.css";

export default function ColumnComponent(props) {

    return (
        <div className={"all-columns"}>
            <div className={"column-div"} style={{width: props.width + "vw"}}>
                <div className={"column-header-div"}>
                    <p className={"column-header-text"}>
                        {props.columnName}
                    </p>
                </div>
                <div className={"assignment-holder"}>
                    {props.children}
                </div>
            </div>
        </div>

    )
}

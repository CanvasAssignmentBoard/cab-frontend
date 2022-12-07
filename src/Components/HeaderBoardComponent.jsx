import React from 'react';
import "./css/HeaderBoardComponent.css"
import CreateAssignmentComponent from "./CreateAssignmentComponent";
import CreateBoardComponent from "./CreateBoardComponent";

export default function HeaderBoardComponent(props) {

    return (
        <div className={"header"}>
            <CreateAssignmentComponent/>
        </div>
    )
}
import React, {useEffect, useState, useContext} from 'react';
import AssignmentProvider from '../Providers/AssignmentProvider';
import {BoardContext} from "../Providers/BoardProvider";
import {AssignmentContext} from "../Providers/AssignmentProvider";
import TaskProvider, {TaskContext} from "../Providers/TaskProvider";
import NavbarComponent from './NavbarComponent';
//import HeaderComponent from './HeaderComponentOld';
import ColumnComponent from './ColumnComponent';
import AssignmentComponent from './AssignmentComponent';
import HeaderBoardComponent from "./HeaderBoardComponent";
import {FilterContext} from "../Providers/FilterProvider";
import ColumnListComponent from "./ColumnListComponent";
import AssignmentListComponent from "./AssignmentListComponent";
import BoardListContainerComponent from "./css/BoardListContainerComponent.css"

function LoadAssignmentBoard() {
    const assignments = useContext(AssignmentContext).assignments;
    console.log(assignments);

    return (
        <div className={"column-list-container"}>
            <ColumnListComponent columnName={'🔵 To Do (' + assignments.filter(assignment => assignment.status === "TODO").length + ')'}>
                {assignments.filter(assignment => assignment.status === "TODO").map(assignment => (
                <TaskProvider assignment={assignment}>
                    <AssignmentListComponent assignment={assignment}/>
                </TaskProvider>
                )
            )}
            </ColumnListComponent>
            <ColumnListComponent columnName={'🔴 In Progress (' + assignments.filter(assignment => assignment.status === "In progress").length + ')'}>
                {assignments.filter(assignment => assignment.status === "In progress").map(assignment => (
                <TaskProvider assignment={assignment}>
                    <AssignmentComponent assignment={assignment}/>
                </TaskProvider>
                )
            )}
            </ColumnListComponent>
            <ColumnListComponent columnName={'⚪ Done (' + assignments.filter(assignment => assignment.status === "Done").length + ')'}>
                {assignments.filter(assignment => assignment.status === "Done").map(assignment => (
                <TaskProvider assignment={assignment}>
                    <AssignmentComponent assignment={assignment}/>
                </TaskProvider>
                )
            )}
            </ColumnListComponent>
        </div>
    );
}

export default function BoardListComponent(props) {

    const boards = useContext(BoardContext);
    const filter = useContext(FilterContext);
    console.log(filter);
    const [selectedBoard, setSelectedBoard] = useState(null);
    if (boards.length > 0 && selectedBoard == null) {
        setSelectedBoard(boards[0]);
    }


    return (
        <div style={{display: "flex"}}>
            {/*<HeaderComponent />*/}
            {/* <NavbarComponent boards={boards.boards} selectedBoard={boards.selectedBoard} setSelectedBoard={boards.setSelectedBoard}/> */}
            <AssignmentProvider board={boards.selectedBoard} filter={filter.filter}>
                <LoadAssignmentBoard/>
            </AssignmentProvider>
            {/* <HeaderBoardComponent/> */}


        </div>

    )
}
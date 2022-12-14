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


function LoadAssignmentBoard() {
    const assignments = useContext(AssignmentContext).assignments;
    console.log(assignments);

    return (
        <div style={{marginLeft: "2vw"}}>
            <div data-testid="required-column-list" className={"board-div grid grid-cols-3 gap-12 items-stretch"}>
            <ColumnComponent columnName={'🔵 To Do (' + assignments.filter(assignment => assignment.status === "TODO").length + ')'}>
                {assignments.filter(assignment => assignment.status === "TODO").map(assignment => (
                <TaskProvider assignment={assignment}>
                    <AssignmentComponent assignment={assignment}/>
                </TaskProvider>
                )
            )}
            </ColumnComponent>
            <ColumnComponent columnName={'🔴 In Progress (' + assignments.filter(assignment => assignment.status === "In progress").length + ')'}>
                {assignments.filter(assignment => assignment.status === "In progress").map(assignment => (
                <TaskProvider assignment={assignment}>
                    <AssignmentComponent assignment={assignment}/>
                </TaskProvider>
                )
            )}
            </ColumnComponent>
            <ColumnComponent columnName={'⚪ Done (' + assignments.filter(assignment => assignment.status === "Done").length + ')'}>
                {assignments.filter(assignment => assignment.status === "Done").map(assignment => (
                <TaskProvider assignment={assignment}>
                    <AssignmentComponent assignment={assignment}/>
                </TaskProvider>
                )
            )}
            </ColumnComponent>
            </div>
        </div>
    );
}

export default function BoardComponent(props) {

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
import React, {useEffect, useState, useContext} from 'react';
import AssignmentProvider from '../Providers/AssignmentProvider';
import {BoardContext} from "../Providers/BoardProvider";
import {AssignmentContext} from "../Providers/AssignmentProvider";
import NavbarComponent from './NavbarComponent';
import HeaderComponent from './HeaderComponent';
import ColumnComponent from './ColumnComponent';
import ColumnHeaderComponent from './ColumnHeaderComponent';
import AssignmentComponent from './AssignmentComponent';

function LoadAssignmentBoard() {
    const assignments = useContext(AssignmentContext);

    return (
        <div data-testid="required-column-list" className={"board-div grid grid-cols-3 gap-4"}>
            <ColumnComponent columnName={'🔵 To Do (' + assignments.filter(assignment => assignment.status === "TODO").length + ')'}>
                {assignments.filter(assignment => assignment.status === "TODO").map(assignment => <AssignmentComponent assignment={assignment}/>)}
            </ColumnComponent>
            <ColumnComponent columnName={'🔴 In Progress (' + assignments.filter(assignment => assignment.status === "In progress").length + ')'}>
                {assignments.filter(assignment => assignment.status === "In progress").map(assignment => <AssignmentComponent assignment={assignment}/>)}
            </ColumnComponent>
            <ColumnComponent columnName={'⚪ Done (' + assignments.filter(assignment => assignment.status === "Done").length + ')'}>
                {assignments.filter(assignment => assignment.status === "Done").map(assignment => <AssignmentComponent assignment={assignment}/>)}
            </ColumnComponent>
        </div>
    );
}
export default function BoardComponent(props) {

    const [selectedBoard, setSelectedBoard] = useState(null);
    const boards = useContext(BoardContext);

    return (
        <>
        <div className={"grid grid-cols-2 gap-4"}>

        </div>
            <HeaderComponent />
            <NavbarComponent boards={boards} selectedBoard={selectedBoard} setSelectedBoard={setSelectedBoard}/>
            <AssignmentProvider board={selectedBoard}>
                <LoadAssignmentBoard />
            </AssignmentProvider>        
        </>

    )
}
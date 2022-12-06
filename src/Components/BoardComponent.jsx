import React, {useEffect, useState, useContext} from 'react';
import AssignmentProvider from '../Providers/AssignmentProvider';
import {BoardContext} from "../Providers/BoardProvider";
import {AssignmentContext} from "../Providers/AssignmentProvider";
import NavbarComponent from './NavbarComponent';
import HeaderComponent from './HeaderComponent';
import ColumnComponent from './ColumnComponent';
import ColumnHeaderComponent from './ColumnHeaderComponent';

function LoadAssignmentBoard() {
    const assignments = useContext(AssignmentContext);

    return (
        <div data-testid="required-column-list" className={"board-div grid grid-cols-3 gap-4"}>
            <ColumnComponent columnName={"🔵 To Do"}>
                {assignments.filter(assignment => assignment.status === "TODO").map(assignment => <p>{assignment.name}</p>)}
            </ColumnComponent>
            <ColumnComponent columnName={"🔴 In Progress"}>
                {assignments.filter(assignment => assignment.status === "In progress").map(assignment => <p>{assignment.name}</p>)}
            </ColumnComponent>
            <ColumnComponent columnName={"⚪ Done"}>
                {assignments.filter(assignment => assignment.status === "Done").map(assignment => <p>{assignment.name}</p>)}
            </ColumnComponent>
        </div>
    );
}
export default function BoardComponent(props) {

    const [selectedBoard, setSelectedBoard] = useState(null);
    const boards = useContext(BoardContext);

    return (
        <>
            <HeaderComponent />
            <NavbarComponent boards={boards} selectedBoard={selectedBoard} setSelectedBoard={setSelectedBoard}/>
            <AssignmentProvider board={selectedBoard}>
                <LoadAssignmentBoard />
            </AssignmentProvider>        
        </>

    )
}
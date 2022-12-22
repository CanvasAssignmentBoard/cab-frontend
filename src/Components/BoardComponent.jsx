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
import ColumnProvider, {ColumnContext} from '../Providers/ColumnProvider';


function LoadColumns(props) {
    const columns = useContext(ColumnContext).columns;

    console.log(columns);

    return (
        <div style={{marginLeft: "2vw"}}>
            <div data-testid="required-column-list" className={"board-div grid grid-cols-3 gap-12 items-stretch"}>
                {columns.map(column => (
                    <ColumnComponent columnName={column.name}>
                        <AssignmentProvider column={column} board={props.board}>
                            <LoadAssignments column={column}/>
                        </AssignmentProvider>
                    </ColumnComponent>
                ))}
            </div>
        </div>
    );
}
function LoadAssignments(props) {
    const assignments = useContext(AssignmentContext).assignments;
    console.log(assignments);

    return (
        <>
            {assignments.map(assignment => (
                <TaskProvider assignment={assignment}>
                    <AssignmentComponent assignment={assignment}/>
                </TaskProvider>                                
            ))}
        </>
    );
}

export default function BoardComponent(props) {

    const boards = useContext(BoardContext);
    const filter = useContext(FilterContext);
    console.log(filter);
    // const [selectedBoard, setSelectedBoard] = useState(null);
    if (boards.length > 0 && boards.selectedBoard == null) {
        if (boards.boards.length > 0) {
            boards.setSelectedBoard(boards.boards[0]);
        }
    }

    console.log(boards)
    // console.log(selectedBoard)


    return (
        <div style={{display: "flex"}}>
            {/*<HeaderComponent />*/}
            {/* <NavbarComponent boards={boards.boards} selectedBoard={boards.selectedBoard} setSelectedBoard={boards.setSelectedBoard}/> */}
            <ColumnProvider board={boards.selectedBoard}>
                <LoadColumns board={boards.selectedBoard}/>
            </ColumnProvider>
            {/* <HeaderBoardComponent/> */}


        </div>

    )
}
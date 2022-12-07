import React, {useEffect, useState, useContext} from 'react';
import AssignmentProvider from '../Providers/AssignmentProvider';
import {BoardContext} from "../Providers/BoardProvider";
import {AssignmentContext} from "../Providers/AssignmentProvider";
import NavbarListComponent from './NavbarListComponent';
//import HeaderComponent from './HeaderComponentOld';
import ColumnComponent from './ColumnComponent';
import ColumnHeaderComponent from './ColumnHeaderComponent';
import AssignmentComponent from './AssignmentComponent';
import NavbarComponent from "./NavbarComponent";
import CreateAssignmentComponent from "./CreateAssignmentComponent";
import HeaderBoardComponent from "./HeaderBoardComponent";


function LoadAssignmentBoard() {
    const assignments = useContext(AssignmentContext);

    return (
        <div style={{marginLeft: "2vw"}}>
            <div data-testid="required-column-list" className={"board-div grid grid-cols-3 gap-12 items-stretch"}>
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
        </div>
    );
}

export default function BoardComponent(props) {

    const boards = useContext(BoardContext);
    const [selectedBoard, setSelectedBoard] = useState(null);
    if (boards.length > 0 && selectedBoard == null) {
        setSelectedBoard(boards[0]);
    }

    return (
        <div style={{display: "flex"}}>
            {/*<HeaderComponent />*/}
            <NavbarComponent boards={boards} selectedBoard={selectedBoard} setSelectedBoard={setSelectedBoard}/>
            <AssignmentProvider board={selectedBoard}>
                <LoadAssignmentBoard/>
            </AssignmentProvider>
            <HeaderBoardComponent/>


        </div>

    )
}
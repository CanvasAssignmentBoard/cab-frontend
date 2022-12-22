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
    const columnCount = 4

    return (
        <div style={{marginLeft: "2vw"}}>
            {
                columnCount === 2 ? (
                    <div data-testid="required-column-list" className={"board-div grid grid-cols-2 gap-12 items-stretch"}>
                        <ColumnComponent width={38} columnName={'🔵 To Do (' + assignments.filter(assignment => assignment.status === "TODO").length + ')'}>
                            {assignments.filter(assignment => assignment.status === "TODO").map(assignment => (
                                    <TaskProvider assignment={assignment}>
                                        <AssignmentComponent assignment={assignment}/>
                                    </TaskProvider>
                                )
                            )}
                        </ColumnComponent>
                        <ColumnComponent width={38} columnName={'⚪ Done (' + assignments.filter(assignment => assignment.status === "Done").length + ')'}>
                            {assignments.filter(assignment => assignment.status === "Done").map(assignment => (
                                    <TaskProvider assignment={assignment}>
                                        <AssignmentComponent assignment={assignment}/>
                                    </TaskProvider>
                                )
                            )}
                        </ColumnComponent>
                    </div>
                ) : ""

            }
            {
                columnCount === 3 ? (
                    <div data-testid="required-column-list" className={"board-div grid grid-cols-3 gap-12 items-stretch"}>
                        <ColumnComponent width={25} columnName={'🔵 To Do (' + assignments.filter(assignment => assignment.status === "TODO").length + ')'}>
                            {assignments.filter(assignment => assignment.status === "TODO").map(assignment => (
                                    <TaskProvider assignment={assignment}>
                                        <AssignmentComponent assignment={assignment}/>
                                    </TaskProvider>
                                )
                            )}
                        </ColumnComponent>
                        <ColumnComponent width={25} columnName={'🔴 In Progress (' + assignments.filter(assignment => assignment.status === "In progress").length + ')'}>
                            {assignments.filter(assignment => assignment.status === "In progress").map(assignment => (
                                    <TaskProvider assignment={assignment}>
                                        <AssignmentComponent assignment={assignment}/>
                                    </TaskProvider>
                                )
                            )}
                        </ColumnComponent>
                        <ColumnComponent width={25} columnName={'⚪ Done (' + assignments.filter(assignment => assignment.status === "Done").length + ')'}>
                            {assignments.filter(assignment => assignment.status === "Done").map(assignment => (
                                    <TaskProvider assignment={assignment}>
                                        <AssignmentComponent assignment={assignment}/>
                                    </TaskProvider>
                                )
                            )}
                        </ColumnComponent>
                    </div>
                ) : ""
            }
            {
                columnCount === 4 ? (
                    <div data-testid="required-column-list" className={"board-div grid grid-cols-4 gap-12 items-stretch"}>
                        <ColumnComponent width={18} columnName={'Backlog (' + assignments.filter(assignment => assignment.status === "TODO").length + ')'}>
                            {assignments.filter(assignment => assignment.status === "TODO").map(assignment => (
                                    <TaskProvider assignment={assignment}>
                                        <AssignmentComponent assignment={assignment}/>
                                    </TaskProvider>
                                )
                            )}
                        </ColumnComponent>
                        <ColumnComponent width={18} columnName={'To Do (' + assignments.filter(assignment => assignment.status === "In progress").length + ')'}>
                            {assignments.filter(assignment => assignment.status === "In progress").map(assignment => (
                                    <TaskProvider assignment={assignment}>
                                        <AssignmentComponent assignment={assignment}/>
                                    </TaskProvider>
                                )
                            )}
                        </ColumnComponent>
                        <ColumnComponent width={18} columnName={'In progress (' + assignments.filter(assignment => assignment.status === "Done").length + ')'}>
                            {assignments.filter(assignment => assignment.status === "Done").map(assignment => (
                                    <TaskProvider assignment={assignment}>
                                        <AssignmentComponent assignment={assignment}/>
                                    </TaskProvider>
                                )
                            )}
                        </ColumnComponent>
                        <ColumnComponent width={18} columnName={'Done (' + assignments.filter(assignment => assignment.status === "Done").length + ')'}>
                            {assignments.filter(assignment => assignment.status === "Done").map(assignment => (
                                    <TaskProvider assignment={assignment}>
                                        <AssignmentComponent assignment={assignment}/>
                                    </TaskProvider>
                                )
                            )}
                        </ColumnComponent>
                    </div>
                ) : ""
            }
            {
                columnCount === 5 ? (
                    <div data-testid="required-column-list" className={"board-div grid grid-cols-5 gap-8 items-stretch"}>
                        <ColumnComponent width={14.5} columnName={'Backlog (' + assignments.filter(assignment => assignment.status === "TODO").length + ')'}>
                            {assignments.filter(assignment => assignment.status === "TODO").map(assignment => (
                                    <TaskProvider assignment={assignment}>
                                        <AssignmentComponent assignment={assignment}/>
                                    </TaskProvider>
                                )
                            )}
                        </ColumnComponent>
                        <ColumnComponent width={14.5} columnName={'To Do (' + assignments.filter(assignment => assignment.status === "In progress").length + ')'}>
                            {assignments.filter(assignment => assignment.status === "In progress").map(assignment => (
                                    <TaskProvider assignment={assignment}>
                                        <AssignmentComponent assignment={assignment}/>
                                    </TaskProvider>
                                )
                            )}
                        </ColumnComponent>
                        <ColumnComponent width={14.5} columnName={'In progress (' + assignments.filter(assignment => assignment.status === "Done").length + ')'}>
                            {assignments.filter(assignment => assignment.status === "Done").map(assignment => (
                                    <TaskProvider assignment={assignment}>
                                        <AssignmentComponent assignment={assignment}/>
                                    </TaskProvider>
                                )
                            )}
                        </ColumnComponent>
                        <ColumnComponent width={14.5} columnName={'Review (' + assignments.filter(assignment => assignment.status === "Done").length + ')'}>
                            {assignments.filter(assignment => assignment.status === "Done").map(assignment => (
                                    <TaskProvider assignment={assignment}>
                                        <AssignmentComponent assignment={assignment}/>
                                    </TaskProvider>
                                )
                            )}
                        </ColumnComponent>
                        <ColumnComponent width={14.5} columnName={'Done (' + assignments.filter(assignment => assignment.status === "Done").length + ')'}>
                            {assignments.filter(assignment => assignment.status === "Done").map(assignment => (
                                    <TaskProvider assignment={assignment}>
                                        <AssignmentComponent assignment={assignment}/>
                                    </TaskProvider>
                                )
                            )}
                        </ColumnComponent>
                    </div>
                ) : ""
            }
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

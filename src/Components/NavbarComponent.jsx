import './css/NavbarComponent.css'
import {useState} from "react";
import NavbarListComponent from "./NavbarListComponent";
import CreateBoardComponent from "./CreateBoardComponent";
export default function NavbarComponent(props){
    const allBoards=[
        {boardName: 'Board 1', boardID: 1},
        {boardName: 'Board 2', boardID: 2, disabled: true},
        {boardName: 'Board 3', boardID: 3, disabled: true}
    ];
    const allTasks=[
        {boardName: 'To do', boardID: 1, disabled: true},
        {boardName: 'In Progress', boardID: 2, disabled: true},
        {boardName: 'Done', boardID: 3, disabled: true}
    ];
    return <div className={"navbar-container"}>
        <CreateBoardComponent/>
        <NavbarListComponent title={'Boards'} boards={allBoards}/>
        <NavbarListComponent title={'Tasks'} boards={allTasks}/>
    </div>
}

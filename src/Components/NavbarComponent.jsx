import './css/NavbarComponent.css'
import {useState} from "react";
import NavbarListComponent from "./NavbarListComponent";
export default function NavbarComponent(props){
    const allBoards=[
        {boardName: 'Board 1', boardID: 1},
        {boardName: 'Board 2', boardID: 2},
        {boardName: 'Board 3', boardID: 3}
    ];
    const allTasks=[
        {boardName: 'To do', boardID: 1},
        {boardName: 'In Progress', boardID: 2},
        {boardName: 'Done', boardID: 3}
    ];
    return <div className={"navbar-container"}>
        <NavbarListComponent title={'Boards'} boards={[allBoards]}/>
        <NavbarListComponent title={'Tasks'} boards={[allTasks]}/>
    </div>
}

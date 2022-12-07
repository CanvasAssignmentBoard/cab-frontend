import './css/NavbarComponent.css'
import {useState} from "react";
import NavbarListComponent from "./NavbarListComponent";
import CreateBoardComponent from "./CreateBoardComponent";
export default function NavbarComponent(props){
    const allTasks=[
        {name: 'To do', id: 1},
        {name: 'In Progress', id: 2},
        {name: 'Done', id: 3}
    ];

    return <div className={"navbar-container"}>
        <div className={"boards-title"}>
            Boards
            <CreateBoardComponent/>
        </div>
        <NavbarListComponent title={'Boards'} boards={props.boards} selectedBoard={props.selectedBoard} setSelectedBoard={props.setSelectedBoard}/>
        <NavbarListComponent title={'Tasks'} boards={allTasks}/>
    </div>
}
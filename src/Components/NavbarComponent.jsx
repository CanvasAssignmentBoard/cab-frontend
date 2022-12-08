import './css/NavbarComponent.css'
import {useState} from "react";
import NavbarListComponent from "./NavbarListComponent";
import CreateBoardComponent from "./CreateBoardComponent";
import {useContext} from "react";
import {BoardContext} from "../Providers/BoardProvider";
export default function NavbarComponent(props){
    const boards = useContext(BoardContext);

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
        <NavbarListComponent title={'Boards'} boards={boards.boards} selectedBoard={boards.selectedBoard} setSelectedBoard={boards.setSelectedBoard}/>
        <NavbarListComponent title={'Tasks'} boards={allTasks}/>
    </div>
}
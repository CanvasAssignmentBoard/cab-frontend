import './css/NavbarComponent.css'
import {useState} from "react";
import NavbarListComponent from "./NavbarListComponent";
export default function NavbarComponent(props){
    const allTasks=[
        {name: 'To do', id: 1},
        {name: 'In Progress', id: 2},
        {name: 'Done', id: 3}
    ];

    return <div className={"navbar-container"}>
        <NavbarListComponent title={'Boards'} boards={props.boards} selectedBoard={props.selectedBoard} setSelectedBoard={props.setSelectedBoard}/>
        <NavbarListComponent title={'Tasks'} boards={allTasks}/>
    </div>
}
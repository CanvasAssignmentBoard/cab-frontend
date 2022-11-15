import './css/NavbarComponent.css'
import {useState} from "react";
import NavbarListComponent from "./NavbarListComponent";
export default function NavbarComponent(props){
    return <div className={"navbar-container"}>
        <NavbarListComponent title={'Boards'} boards={['Board 1', 'Board 2', 'Board 3']}/>
        <NavbarListComponent title={'Tasks'} boards={['To do', 'In Progress', 'Done']}/>
    </div>
}

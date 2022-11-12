import React from 'react';
import { AiFillPlusCircle } from "react-icons/ai";
import "./css/CreateBoardComponent.css";

export default function CreateBoardComponent() {

    return(
        <AiFillPlusCircle className={"create-board-button"} size={28}
                          onClick={() => {console.log("Test")}}/>
    )
}
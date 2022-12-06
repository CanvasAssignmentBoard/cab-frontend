import React, {useContext} from 'react';
import {BoardContext} from "../Providers/BoardProvider";

export default function TestComponent() {
    const boards = useContext(BoardContext);
    return (
        <div>
            {boards.map(board => <p>{board.name}</p>)}
        </div>
    )
}
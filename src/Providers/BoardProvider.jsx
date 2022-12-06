import React, {useEffect, useState, createContext} from 'react';

function GetBoards() {
    const [boards, setBoards] = useState([]);
    const host = process.env.REACT_APP_API_HOST
    useEffect(() => {
        fetch(`${host}/Board/All`)
            .then(response => response.json())
            .then(data => setBoards(data));
    }, []);
    return boards;
}

export const BoardContext = createContext();

export default function BoardProvider(props) {
    const boards = GetBoards();
    return (
        <BoardContext.Provider value={boards}>
            {props.children}
        </BoardContext.Provider>
    );
}
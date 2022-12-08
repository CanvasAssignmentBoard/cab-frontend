import React, {useEffect, useState, createContext} from 'react';

function GetBoards(reloadBoards, setReloadBoards) {
    const [boards, setBoards] = useState([]);
    const host = process.env.REACT_APP_API_HOST
    useEffect(() => {
        if (boards.length == 0 || reloadBoards) {
            fetch(`${host}/board`)
                .then(response => response.json())
                .then(data => setBoards(data));
            setReloadBoards(false);
        }
    }, [reloadBoards]);
    return boards;
}

export const BoardContext = createContext();

export default function BoardProvider(props) {
    const [reloadBoards, setReloadBoards] = useState(false);
    const boards = GetBoards(reloadBoards, setReloadBoards);

    function updateBoards() {
        setReloadBoards(true);
    }

    return (
        <BoardContext.Provider value={{boards: boards, updateBoards: updateBoards}}>
            {props.children}
        </BoardContext.Provider>
    );
}
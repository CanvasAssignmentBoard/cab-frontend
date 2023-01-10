import React from 'react';

function GetBoards(reloadBoards, setReloadBoards, selectedBoard, setSelectedBoard) {
    const [boards, setBoards] = React.useState([]);
    const host = process.env.REACT_APP_API_HOST
    React.useEffect(() => {
        console.log("Really why no reload :(")
        if (boards.length == 0 || reloadBoards) {
            console.log("pfff ::::::::")
            fetch(`${host}/board`)
                .then(response => response.json())
                .then(data => {
                    setBoards(data)
                    if (selectedBoard == null) {
                        setSelectedBoard(data[0]);
                    }
                });
            setReloadBoards(false);
        }
    }, [boards.length, host, reloadBoards, selectedBoard, setReloadBoards, setSelectedBoard]);
    return boards;
}

export const BoardContext = React.createContext();

export default function BoardProvider(props) {
    const [reloadBoards, setReloadBoards] = React.useState(false);
    const [selectedBoard, setSelectedBoard] = React.useState(null);
    const boards = GetBoards(reloadBoards, setReloadBoards, selectedBoard, setSelectedBoard);

    function updateBoards() {
        console.log("reload");
        setReloadBoards(true);
    }

    return (
        <BoardContext.Provider value={{boards: boards, updateBoards: updateBoards, selectedBoard: selectedBoard, setSelectedBoard: setSelectedBoard}}>
            {props.children}
        </BoardContext.Provider>
    );
}
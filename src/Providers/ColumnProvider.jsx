import React from 'react';

function GetColumns(boardId, reloadColumns, setReloadColumns, setColumns, columns) {
    // const [columns, setColumns] = React.useState([]);
    const host = process.env.REACT_APP_API_HOST;
    React.useEffect(() => {
        // if (columns.length == 0 || reloadColumns) {
            fetch(`${host}/board/${boardId}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setColumns(data.rows)
                });
            setReloadColumns(false);
        // }
    }, [columns.length, host, reloadColumns, setReloadColumns, boardId]);
    return columns;
}

export const ColumnContext = React.createContext();

export default function ColumnProvider(props) {
    const [reloadColumns, setReloadColumns] = React.useState(false);
    const [columns, setColumns] = React.useState([]);

    function updateColumns() {
        setReloadColumns(true);
    }

    if (props.board == null) {
        return <></>;
    }

    GetColumns(props.board.id, reloadColumns, setReloadColumns, setColumns, columns);
    console.log(columns);

    if (columns.length == 0) {
        return <></>;
    }

    return (
        <ColumnContext.Provider value={{columns: columns, updateColumns: updateColumns}}>
            {props.children}
        </ColumnContext.Provider>
    );
}
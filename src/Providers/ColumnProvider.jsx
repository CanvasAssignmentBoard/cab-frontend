import React from 'react';

function GetColumns(boardId, reloadColumns, setReloadColumns) {
    const [columns, setColumns] = React.useState([]);
    const host = process.env.REACT_APP_API_HOST
    React.useEffect(() => {
        if (columns.length == 0 || reloadColumns) {
            fetch(`${host}/board/${boardId}`)
                .then(response => response.json())
                .then(data => {
                    setColumns(data.columns)
                });
            setReloadColumns(false);
        }
    }, [columns.length, host, reloadColumns, setReloadColumns, boardId]);
    return columns;
}

export const ColumnContext = React.createContext();

export default function ColumnProvider(props) {
    const [reloadColumns, setReloadColumns] = React.useState(false);

    function updateColumns() {
        setReloadColumns(true);
    }

    console.log(props);
    if (props.board == null) {
        return <></>;
    }

    const columns = GetColumns(props.board.id, reloadColumns, setReloadColumns);
    console.log(columns);

    return (
        <ColumnContext.Provider value={{columns: columns, updateColumns: updateColumns}}>
            {props.children}
        </ColumnContext.Provider>
    );
}
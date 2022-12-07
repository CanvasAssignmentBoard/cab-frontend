import React, {useEffect, useState, createContext} from 'react';

function GetAssignments(boardId) {
    const [assignments, setAssignments] = useState([]);
    
    const host = process.env.REACT_APP_API_HOST
    useEffect(() => {
        if (boardId === null || boardId === undefined) {
            return;
        }
        fetch(`${host}/board/${boardId}`)
            .then(response => response.json())
            .then(data => {
                setAssignments(data.assignments);
            });
    }, [boardId]);

    console.log(assignments);
    return assignments;
}

export const AssignmentContext = createContext();

export default function AssignmentProvider(props) {

    if (props.board == null) {
        return <></>;
    }

    const assignments = GetAssignments(props.board.id);
    return (
        <AssignmentContext.Provider value={assignments}>
            {props.children}
        </AssignmentContext.Provider>
    );
}
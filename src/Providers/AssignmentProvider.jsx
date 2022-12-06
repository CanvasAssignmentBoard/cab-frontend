import React, {useEffect, useState, createContext} from 'react';

function GetAssignments(boardId) {
    const [assignments, setAssignments] = useState([]);
    const host = process.env.REACT_APP_API_HOST
    useEffect(() => {
        fetch(`${host}/assignment/${boardId}`)
            .then(response => response.json())
            .then(data => setAssignments(data));
    }, []);
    return assignments;
}

export const AssignmentContext = createContext();

export default function AssignmentProvider(props) {

    if (props.board == null) {
        return <></>;
    }
    
    const assignments = GetAssignments();
    return (
        <AssignmentContext.Provider value={assignments}>
            {props.children}
        </AssignmentContext.Provider>
    );
}
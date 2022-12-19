import React, {useEffect, useState, createContext} from 'react';
import {useContext} from 'react';
import {FilterContext} from './FilterProvider';

function GetAssignments(boardId, filter) {
    const [assignments, setAssignments] = useState([]);
    console.log(filter);
    const host = process.env.REACT_APP_API_HOST
    useEffect(() => {
        console.log("filteren")
        if (boardId === null || boardId === undefined) {
            return;
        }
        fetch(`${host}/board/${boardId}`)
            .then(response => response.json())
            .then(data => {
                setAssignments(data.assignments.filter(assignment => { return Date.parse(assignment.due_at) <= Date.parse(filter.deadline) || filter.deadline == null; }));
            });
    }, [boardId, filter, host]);

    console.log(assignments);
    return assignments;
}

export const AssignmentContext = createContext();

export default function AssignmentProvider(props) {
    const f = useContext(FilterContext);
    console.log(f);

    if (props.board == null) {
        return <></>;
    }

    const assignments = GetAssignments(props.board.id, f.filter);
    return (
        <AssignmentContext.Provider value={{assignments: assignments}}>
            {props.children}
        </AssignmentContext.Provider>
    );
}
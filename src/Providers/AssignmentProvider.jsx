import React, {useEffect, useState, createContext} from 'react';
import {useContext} from 'react';
import {FilterContext} from './FilterProvider';

function GetAssignments(boardId, columnId, filter, setAssignments, assignments) {
    // const [assignments, setAssignments] = useState([]);
    // console.log(filter);
    console.log(boardId);
    const host = process.env.REACT_APP_API_HOST
    useEffect(() => {
        if (columnId === null || columnId === undefined) {
            return;
        }
        fetch(`${host}/board/${boardId}`)
            .then(response => response.json())
            .then(data => {
                if (data.rows.find(column => column.id === columnId) !== undefined) {                    
                    setAssignments(data.rows.find(column => column.id === columnId).assignments.filter(assignment => { return (Date.parse(assignment.due_at) <= Date.parse(filter.deadline) || filter.deadline == null); }));
                }
                // data.rows.
            });
    }, [boardId, columnId, filter, host]);

    // console.log(assignments);
    return assignments;
}

export const AssignmentContext = createContext();

export default function AssignmentProvider(props) {
    const f = useContext(FilterContext);
    const [assignments, setAssignments] = useState([]);

    if (props.column == null) {
        return <></>;
    }

    GetAssignments(props.board.id, props.column.id, f.filter, setAssignments, assignments);
    
    return (
        <AssignmentContext.Provider value={{assignments: assignments}}>
            {props.children}
        </AssignmentContext.Provider>
    );
}
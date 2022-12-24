import React, {useEffect, useState, createContext} from 'react';
import {useContext} from 'react';
import {FilterContext} from './FilterProvider';

function GetAssignments(boardId, columnId, filter) {
    const [assignments, setAssignments] = useState([]);
    // console.log(filter);
    const host = process.env.REACT_APP_API_HOST
    useEffect(() => {
        if (columnId === null || columnId === undefined) {
            return;
        }
        fetch(`${host}/board/${boardId}`)
            .then(response => response.json())
            .then(data => {
                console.log(columnId);
                console.log(data.columns.find(column => column.id === columnId).assignments);
                setAssignments(data.columns.find(column => column.id === columnId).assignments.filter(assignment => { return (Date.parse(assignment.due_at) <= Date.parse(filter.deadline) || filter.deadline == null); }));
            });
    }, [boardId, columnId, filter, host]);

    // console.log(assignments);
    return assignments;
}

export const AssignmentContext = createContext();

export default function AssignmentProvider(props) {
    const f = useContext(FilterContext);

    if (props.column == null) {
        return <></>;
    }

    const assignments = GetAssignments(props.board.id, props.column.id, f.filter);
    return (
        <AssignmentContext.Provider value={{assignments: assignments}}>
            {props.children}
        </AssignmentContext.Provider>
    );
}
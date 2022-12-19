import React from 'react';

function GetStatus(assignmentName) {
    if (assignmentName.includes("🔵")) {
        return "🔵 Waiting for feedback"
    } else if (assignmentName.includes("⚪️")) {
        return "⚪️ Can be graded"
    } else if (assignmentName.includes("🔴")) { 
        return "🔴 Reviewed"
    } else {
        return "🔵 Waiting for feedback"
    }
}

export default function AssignmentStatusComponent(props) {

    const status = GetStatus(props.assignmentName);

    return (
        <>
        {status}
        </>
        
    )
}

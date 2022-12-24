import AssignmentColumns from "../models/assignmentColumns";
import assignments from "./assignments";
import columns from "./columns";
import status from "../statuses";


const assignmentsColumns: AssignmentColumns[] = [];

assignments.filter(a => a.status == status.todo).forEach(a => {
    assignmentsColumns.push(new AssignmentColumns(getLastAssignmentColumnsId(), columns[0].id, a.id, getNextIndex(columns[0].id)));
});

assignments.filter(a => a.status == status.inProgress).forEach(a => {
    assignmentsColumns.push(new AssignmentColumns(getLastAssignmentColumnsId(), columns[1].id, a.id, getNextIndex(columns[1].id)));
});

assignments.filter(a => a.status == status.done).forEach(a => {
    assignmentsColumns.push(new AssignmentColumns(getLastAssignmentColumnsId(), columns[2].id, a.id, getNextIndex(columns[2].id)));
});

export function getLastAssignmentColumnsId() {
    if (assignmentsColumns.length === 0) return 1;
    return Math.max(...assignmentsColumns.map(assignmentColumns => assignmentColumns.id)) + 1;
}

export function getNextIndex(columnId: number): number {
    return assignmentsColumns.filter(ac => ac.columnId == columnId).length;
}

export default assignmentsColumns;
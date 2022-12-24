import Column from "../models/column";
import status from "../statuses";
import assignments from "./assignments";

const columns = [
    new Column(1, 'Todo', status.todo, 1),
    new Column(2, 'In progress', status.inProgress, 1),
    new Column(3, 'Done', status.done, 1),
    new Column(4, 'Done & Review', status.done, 1)
]

export function getNewColumnId() {
    if (columns.length === 0) return 1;
    return Math.max(...columns.map(column => column.id)) + 1;
}

export default columns;
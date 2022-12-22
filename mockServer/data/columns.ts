import Column from "../models/column";
import status from "../statuses";
import assignments from "./assignments";

const columns = [
    new Column(1, '🔵 Todo', assignments.filter(assignment => assignment.status === status.todo), status.todo),
    new Column(2, '🔴 In progress', assignments.filter(assignment => assignment.status === status.inProgress), status.inProgress),
    new Column(3, '⚪ Done', assignments.filter(assignment => assignment.status === status.done), status.done),
]

export default columns;
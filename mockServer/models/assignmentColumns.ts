import Column from "./column";
import Task from "./task";

export default class AssignmentColumns {
    constructor(id: number, columnId: number, assignmentId: number, index: number) {
        this.id = id;
        this.columnId = columnId;
        this.assignmentId = assignmentId;
        this.index = index;
    }

    id: number;
    columnId: number;
    assignmentId: number;
    index: number;
}
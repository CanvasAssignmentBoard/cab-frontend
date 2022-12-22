import Assignment from "./assignment";
import Status from "../statuses";

export default class Column {
    constructor(id: number, name: string, assignments: Assignment[], status: Status) {
        this.id = id;
        this.name = name;
        this.assignments = assignments;
        this.status = status
    }

    id: number;
    name: string;
    assignments: Assignment[];
    status: Status;
}
import Assignment from "./assignment";
import Status from "../statuses";

export default class Column {
    constructor(id: number, name: string, status: Status, boardId: number) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.boardId = boardId;
    }

    id: number;
    name: string;
    status: Status;
    boardId: number;
}
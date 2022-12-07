export default class Task {
    constructor(id: number, name: string, description: string, assignmentId:number, createdAt: Date, updatedAt: Date, checked: boolean) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.assignmentId = assignmentId;
        this.checked = checked;
    }

    id: number;
    name: string;
    description: string;
    createdAt: Date
    updatedAt: Date;
    assignmentId: number;
    checked: boolean;
}
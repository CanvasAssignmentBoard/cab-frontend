import Task from "./task";

export default class Assignment {
    constructor(id: number, name: string,status: string, courseId: number, description: string, tasks:Task[], dueDate: Date, createdAt: Date, updatedAt: Date, submission: number) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.description = description;
        this.tasks = tasks;
        this.dueDate = dueDate;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.submission = submission;
        this.courseId = courseId;
    }

    id: number;
    name: string;
    status: string;
    description: string;
    tasks: Task[];
    createdAt: Date
    updatedAt: Date;
    dueDate: Date;
    courseId: number
    submission: number
}
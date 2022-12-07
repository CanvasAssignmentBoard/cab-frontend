export default class Course {
    constructor(id: number, name: string, createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    id: number;
    name: string;
    createdAt: Date
    updatedAt: Date;
}
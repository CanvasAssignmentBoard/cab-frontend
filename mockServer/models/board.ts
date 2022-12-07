import Course from "./course";

export default class Board {
    
    id: number;
    name: string;
    courses: Course[];

    constructor(id: number, name: string, courses: Course[]) {
        this.id = id;
        this.name = name;
        this.courses = courses;
    }
}
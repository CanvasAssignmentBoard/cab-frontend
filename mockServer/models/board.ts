import Course from "./course";
import Column from "./column";

export default class Board {
    
    id: number;
    name: string;
    courses: Course[];
    columns: Column[];

    constructor(id: number, name: string, courses: Course[], columns: Column[]) {
        this.id = id;
        this.name = name;
        this.courses = courses;
        this.columns = columns;
    }
}
import Course from "../models/course";

const courses = [
    new Course(1, 'Course 1', new Date(), new Date()),
    new Course(2, 'Course 2', new Date(), new Date()),
    new Course(3, 'Course 3', new Date(), new Date()),
    new Course(4, 'Course 4', new Date(), new Date()),
]

export function getNewCourseId() {
    if (courses.length === 0) return 1;
    return Math.max(...courses.map(course => course.id)) + 1;
}

export default courses;
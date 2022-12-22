import Assignment from "../models/assignment"
import tasks from "./tasks";
import status from "../statuses";

const deadlineDates = [
    new Date(2022, 11, 15),
    new Date(2022, 11, 18),
    new Date(2022, 11, 7),
    new Date(2022, 11, 20),
    new Date(2022, 11, 4),
    new Date(2022, 11, 22),
]

const assignments = [
    new Assignment(1, 'Assignment 1', status.todo, 1, 'Description 1', tasks.filter(task => task.assignmentId === 1), deadlineDates[0], new Date(), new Date(), 1),
    new Assignment(2, 'Assignment 2', status.todo, 1, 'Description 2', tasks.filter(task => task.assignmentId === 2), deadlineDates[1], new Date(), new Date(), 1),
    new Assignment(3, 'Assignment 3', status.inProgress, 2, 'Description 3', tasks.filter(task => task.assignmentId === 3), deadlineDates[2], new Date(), new Date(), 1),
    new Assignment(4, 'Assignment 4', status.inProgress, 1, 'Description 4', tasks.filter(task => task.assignmentId === 4), deadlineDates[3], new Date(), new Date(), 1),
    new Assignment(5, 'Assignment 5', status.done, 3, 'Description 5', tasks.filter(task => task.assignmentId === 5), deadlineDates[4], new Date(), new Date(), 1),
    new Assignment(6, 'Assignment 6', status.done, 2, 'Description 6', tasks.filter(task => task.assignmentId === 6), deadlineDates[5], new Date(), new Date(), 1)
]

export default assignments;
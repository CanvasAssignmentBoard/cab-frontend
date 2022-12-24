import Task from "../models/task";

const tasks = [
    new Task(1, 'Task 1', "", 1, new Date(), new Date(), true,),
    new Task(2, 'Task 2', "", 1, new Date(), new Date(), true),
    new Task(3, 'Task 3', "", 1, new Date(), new Date(), false),
    new Task(4, 'Task 4', "", 2, new Date(), new Date(), false),
    new Task(5, 'Task 5', "", 2, new Date(), new Date(), false),
    new Task(6, 'Task 6', "", 3, new Date(), new Date(), true),
    new Task(7, 'Task 7', "", 3, new Date(), new Date(), true),
    new Task(8, 'Task 8', "", 4, new Date(), new Date(), true),
    new Task(9, 'Task 9', "", 5, new Date(), new Date(), true),
    new Task(10, 'Task 10', "", 5, new Date(), new Date(), true),
    new Task(11, 'Task 11', "", 6, new Date(), new Date(), true),
    new Task(12, 'Task 12', "", 6, new Date(), new Date(), true)

]

export function getNewTaskId() {
    if (tasks.length === 0) return 1;
    return Math.max(...tasks.map(task => task.id)) + 1;
}

export default tasks;
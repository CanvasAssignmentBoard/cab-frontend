"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNewTaskId = void 0;
const task_1 = __importDefault(require("../models/task"));
const tasks = [
    new task_1.default(1, 'Task 1', "", 1, new Date(), new Date(), true),
    new task_1.default(2, 'Task 2', "", 1, new Date(), new Date(), true),
    new task_1.default(3, 'Task 3', "", 1, new Date(), new Date(), false),
    new task_1.default(4, 'Task 4', "", 2, new Date(), new Date(), false),
    new task_1.default(5, 'Task 5', "", 2, new Date(), new Date(), false),
    new task_1.default(6, 'Task 6', "", 3, new Date(), new Date(), true),
    new task_1.default(7, 'Task 7', "", 3, new Date(), new Date(), true),
    new task_1.default(8, 'Task 8', "", 4, new Date(), new Date(), true),
    new task_1.default(9, 'Task 9', "", 5, new Date(), new Date(), true),
    new task_1.default(10, 'Task 10', "", 5, new Date(), new Date(), true),
    new task_1.default(11, 'Task 11', "", 6, new Date(), new Date(), true),
    new task_1.default(12, 'Task 12', "", 6, new Date(), new Date(), true)
];
function getNewTaskId() {
    if (tasks.length === 0)
        return 1;
    return Math.max(...tasks.map(task => task.id)) + 1;
}
exports.getNewTaskId = getNewTaskId;
exports.default = tasks;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNewAssignmentId = void 0;
const assignment_1 = __importDefault(require("../models/assignment"));
const tasks_1 = __importDefault(require("./tasks"));
const statuses_1 = __importDefault(require("../statuses"));
const deadlineDates = [
    new Date(2022, 11, 15),
    new Date(2022, 11, 18),
    new Date(2022, 11, 7),
    new Date(2022, 11, 20),
    new Date(2022, 11, 4),
    new Date(2022, 11, 22),
];
const assignments = [
    new assignment_1.default(1, 'Assignment 1', statuses_1.default.todo, 1, 'Description 1', tasks_1.default.filter(task => task.assignmentId === 1), deadlineDates[0], new Date(), new Date(), 1),
    new assignment_1.default(2, 'Assignment 2', statuses_1.default.todo, 1, 'Description 2', tasks_1.default.filter(task => task.assignmentId === 2), deadlineDates[1], new Date(), new Date(), 1),
    new assignment_1.default(3, 'Assignment 3', statuses_1.default.inProgress, 2, 'Description 3', tasks_1.default.filter(task => task.assignmentId === 3), deadlineDates[2], new Date(), new Date(), 1),
    new assignment_1.default(4, 'Assignment 4', statuses_1.default.inProgress, 1, 'Description 4', tasks_1.default.filter(task => task.assignmentId === 4), deadlineDates[3], new Date(), new Date(), 1),
    new assignment_1.default(5, 'Assignment 5', statuses_1.default.done, 3, 'Description 5', tasks_1.default.filter(task => task.assignmentId === 5), deadlineDates[4], new Date(), new Date(), 1),
    new assignment_1.default(6, 'Assignment 6', statuses_1.default.done, 2, 'Description 6', tasks_1.default.filter(task => task.assignmentId === 6), deadlineDates[5], new Date(), new Date(), 1)
];
function getNewAssignmentId() {
    if (assignments.length === 0)
        return 1;
    return Math.max(...assignments.map(assignment => assignment.id)) + 1;
}
exports.getNewAssignmentId = getNewAssignmentId;
exports.default = assignments;

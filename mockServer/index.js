"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const board_1 = __importDefault(require("./models/board"));
const cors_1 = __importDefault(require("cors"));
const assignment_1 = __importDefault(require("./models/assignment"));
const task_1 = __importDefault(require("./models/task"));
const course_1 = __importDefault(require("./models/course"));
const joi_1 = __importDefault(require("joi"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const courses = [
    new course_1.default(1, 'Course 1', new Date(), new Date()),
    new course_1.default(2, 'Course 2', new Date(), new Date()),
    new course_1.default(3, 'Course 3', new Date(), new Date())
];
const boards = [
    new board_1.default(1, 'Board 1', courses),
    new board_1.default(2, 'Board 2', [courses[0]]),
    new board_1.default(3, 'Board 3', [courses[1], courses[2]]),
];
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
const deadlineDates = [
    new Date(2022, 11, 15),
    new Date(2022, 11, 18),
    new Date(2022, 11, 7),
    new Date(2022, 11, 20),
    new Date(2022, 11, 4),
    new Date(2022, 11, 22),
];
const assignments = [
    new assignment_1.default(1, 'Assignment 1', "TODO", 1, 'Description 1', tasks.filter(task => task.assignmentId === 1), deadlineDates[0], new Date(), new Date(), 1),
    new assignment_1.default(2, 'Assignment 2', "TODO", 1, 'Description 2', tasks.filter(task => task.assignmentId === 2), deadlineDates[1], new Date(), new Date(), 1),
    new assignment_1.default(3, 'Assignment 3', "In progress", 2, 'Description 3', tasks.filter(task => task.assignmentId === 3), deadlineDates[2], new Date(), new Date(), 1),
    new assignment_1.default(4, 'Assignment 4', "In progress", 1, 'Description 4', tasks.filter(task => task.assignmentId === 4), deadlineDates[3], new Date(), new Date(), 1),
    new assignment_1.default(5, 'Assignment 5', "Done", 3, 'Description 5', tasks.filter(task => task.assignmentId === 5), deadlineDates[4], new Date(), new Date(), 1),
    new assignment_1.default(6, 'Assignment 6', "Done", 2, 'Description 6', tasks.filter(task => task.assignmentId === 6), deadlineDates[5], new Date(), new Date(), 1)
];
const allowedList = ['http://localhost:3001'];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin)
            return callback(null, true);
        if (allowedList.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));
app.use(express_1.default.json());
app.use(function (req, res, next) {
    res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; font-src 'self'; connect-src 'self';");
    next();
});
app.get('/Board/All', (req, res) => {
    res.send(boards);
});
app.get('/assignment/:boardId', (req, res) => {
    const boardId = req.params.boardId;
    const board = boards.find(board => board.id === parseInt(boardId));
    console.log(board);
    if (board) {
        res.send(assignments.filter(assignment => board.courses.map(course => course.id).includes(assignment.courseId)));
    }
});
app.get('/course/:courseId', (req, res) => {
    const courseId = req.params.courseId;
    res.send(courses.filter(course => course.id === parseInt(courseId)));
});
app.get('/course', (req, res) => {
    res.send(courses);
});
app.post('/assignments/:courseId', (req, res) => {
    try {
        console.log(req);
        if (!req.body) {
            throw new Error("Missing request Body");
        }
        const schema = joi_1.default.object().keys({
            name: joi_1.default.string().min(3).max(200).required(),
            status: joi_1.default.string().required(),
            description: joi_1.default.string(),
            dueDate: joi_1.default.date().required(),
            submission: joi_1.default.string().required()
        });
        const paramResult = joi_1.default.number().required().messages({ 'number.base': "Invalid course id" }).validate(req.params.courseId);
        if (paramResult.error) {
            throw new Error(paramResult.error.details[0].message);
        }
        const result = schema.validate(req.body);
        if (result.error) {
            throw new Error(result.error.details[0].message);
        }
        const courseId = req.params.courseId;
        const assignment = new assignment_1.default(0, req.body.name, req.body.status, courseId, req.body.description, [], req.body.dueDate, new Date(Date.now()), new Date(Date.now()), req.body.submission);
        assignments.push(assignment);
        res.send(assignment);
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
            res.status(400).send(err.message);
            return;
        }
        else {
            console.error(err);
            res.status(400).send(err);
        }
    }
});
app.listen(port, () => {
    console.log(`Mock server listening at http://localhost:${port}`);
});

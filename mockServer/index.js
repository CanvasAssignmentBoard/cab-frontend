"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const task_1 = require("./routes/task");
const course_1 = require("./routes/course");
const assignment_1 = require("./routes/assignment");
const board_1 = require("./routes/board");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
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
// Tasks
app.get("/task", function (req, res) {
    (0, task_1.getTasks)(req, res);
});
app.get("/task/:assignmentId", function (req, res) {
    (0, task_1.getTaskByAssignment)(req, res);
});
app.post('/task', (req, res) => {
    (0, task_1.createTask)(req, res);
});
app.put("/task", (req, res) => {
    (0, task_1.updateTask)(req, res);
});
app.delete("/task/:taskId", (req, res) => {
    (0, task_1.deleteTask)(req, res);
});
// Boards
app.get('/board', (req, res) => {
    (0, board_1.getBoards)(req, res);
});
app.get('/board/:boardId', (req, res) => {
    (0, board_1.getBoard)(req, res);
});
app.post('/board', (req, res) => {
    (0, board_1.createBoard)(req, res);
});
// Assignments
// You can get all assignments with the board call.
app.post("/assignment/:boardId", (req, res) => {
    (0, assignment_1.createAssignment)(req, res);
});
app.put('/assignment/move/:assignmentId', (req, res) => {
    (0, assignment_1.moveAssignment)(req, res);
});
// Courses
app.get('/course', (req, res) => {
    (0, course_1.getCourses)(req, res);
});
// Columns
// app.get('/assignment/:boardId', (req: Request, res: Response) => {
//     const boardId = req.params.boardId;
//     const board = boards.find(board => board.id === parseInt(boardId));
//     console.log(board);
//     if (board) {
//         res.send(assignments.filter(assignment => board.courses.map(course => course.id).includes(assignment.courseId)));
//     }
// })
// app.get('/course/:courseId', (req: Request, res: Response) => {
//     const courseId = req.params.courseId;
//     res.send(courses.filter(course => course.id === parseInt(courseId)));
// });
// app.get('/task/:assignmentId', (req: Request, res: Response) => {
//     const assignmentId = req.params.assignmentId;
//     res.send(assignments.find(assignment => assignment.id === parseInt(assignmentId))?.tasks);
// });
app.listen(port, () => {
    console.log(`Mock server listening at http://localhost:${port}`);
});

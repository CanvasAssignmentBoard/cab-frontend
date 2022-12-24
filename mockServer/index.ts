import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import Board from './models/board';
import cors from 'cors';
import Assignment from './models/assignment';
import Task from './models/task';
import Course from './models/course';
import joi from 'joi';

import courses from './data/courses';
import boards from './data/boards';
import assignments from './data/assignments';
import { createTask, deleteTask, getTaskByAssignment, getTasks, updateTask } from './routes/task';
import { getCourses } from './routes/course';
import { createAssignment, moveAssignment } from './routes/assignment';
import { createBoard, getBoard, getBoards } from './routes/board';


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;


const allowedList = ['http://localhost:3001'];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedList.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}))

app.use(express.json());

app.use(function (req, res, next) {
    res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; font-src 'self'; connect-src 'self';");
    next();
});


// Tasks
app.get("/task", function (req: Request, res: Response) {
    getTasks(req, res);
});
app.get("/task/:assignmentId", function (req: Request, res: Response) {
    getTaskByAssignment(req, res);
})
app.post('/task', (req: Request, res: Response) => {
    createTask(req, res);
});
app.put("/task", (req: Request, res: Response) => {
    updateTask(req, res);
})
app.delete("/task/:taskId", (req: Request, res: Response) => {
    deleteTask(req, res);
})

// Boards
app.get('/board', (req: Request, res: Response) => {
    getBoards(req, res);
});
app.get('/board/:boardId', (req: Request, res: Response) => {
    getBoard(req, res);
});
app.post('/board', (req: Request, res: Response) => {
    createBoard(req, res);
})
// Assignments
// You can get all assignments with the board call.
app.post("/assignment/:boardId", (req: Request, res: Response) => {
    createAssignment(req, res);
})
app.put('/assignment/move/:assignmentId', (req: Request, res: Response) => {
    moveAssignment(req, res);
})

// Courses
app.get('/course', (req: Request, res: Response) => {
    getCourses(req, res);
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

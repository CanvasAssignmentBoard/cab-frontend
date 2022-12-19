import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import Board from './models/board';
import cors from 'cors';
import Assignment from './models/assignment';
import Task from './models/task';
import Course from './models/course';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const courses = [
    new Course(1, 'Course 1', new Date(), new Date()),
    new Course(2, 'Course 2', new Date(), new Date()),
    new Course(3, 'Course 3', new Date(), new Date())
]

const boards = [
    new Board(1, 'Board 1', courses),
    new Board(2, 'Board 2', [courses[0]]),
    new Board(3, 'Board 3', [courses[1], courses[2]]),
];

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

const deadlineDates = [
    new Date(2022, 11, 15),
    new Date(2022, 11, 18),
    new Date(2022, 11, 7),
    new Date(2022, 11, 20),
    new Date(2022, 11, 4),
    new Date(2022, 11, 22),
]

const assignments = [
    new Assignment(1, 'Assignment 1', "TODO", 1, 'Description 1', tasks.filter(task => task.assignmentId === 1), deadlineDates[0], new Date(), new Date(), 1),
    new Assignment(2, 'Assignment 2', "TODO", 1, 'Description 2', tasks.filter(task => task.assignmentId === 2), deadlineDates[1], new Date(), new Date(), 1),
    new Assignment(3, 'Assignment 3', "In progress", 2, 'Description 3', tasks.filter(task => task.assignmentId === 3), deadlineDates[2], new Date(), new Date(), 1),
    new Assignment(4, 'Assignment 4', "In progress", 1, 'Description 4', tasks.filter(task => task.assignmentId === 4), deadlineDates[3], new Date(), new Date(), 1),
    new Assignment(5, 'Assignment 5', "Done", 3, 'Description 5', tasks.filter(task => task.assignmentId === 5), deadlineDates[4], new Date(), new Date(), 1),
    new Assignment(6, 'Assignment 6', "Done", 2, 'Description 6', tasks.filter(task => task.assignmentId === 6), deadlineDates[5], new Date(), new Date(), 1)
]


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

app.use(function (req, res, next) {
    res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; font-src 'self'; connect-src 'self';");
    next();
});

app.get('/Board/All', (req: Request, res: Response) => {

    res.send(boards);
});

app.get('/assignment/:boardId', (req: Request, res: Response) => {
    const boardId = req.params.boardId;
    const board = boards.find(board => board.id === parseInt(boardId));
    console.log(board);
    if (board) {
        res.send(assignments.filter(assignment => board.courses.map(course => course.id).includes(assignment.courseId)));
    }
})

app.get('/course/:courseId', (req: Request, res: Response) => {
    const courseId = req.params.courseId;
    res.send(courses.filter(course => course.id === parseInt(courseId)));
});

app.get('/course', (req: Request, res: Response) => {
    res.send(courses);
});

app.post('/assignments/:courseId', (req, res) => {
    const courseId = req.params.courseId;
    const assignment = new Assignment(0, req.body.name, req.body.status, req.body.courseId, req.body.description, [], req.body.dueDate, req.body.createdAt, req.body.updatedAt, req.body.submission);
    assignments.push(assignment);
    res.send(assignment);
})

app.listen(port, () => {
    console.log(`Mock server listening at http://localhost:${port}`);
});

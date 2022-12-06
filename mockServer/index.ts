import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import Board from './models/board';
import cors from 'cors';
import Assignment from './models/assignment';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const boards = [
    new Board(1, 'Board 1'),
    new Board(2, 'Board 2'),
    new Board(3, 'Board 3')
];

const assignments = [
    new Assignment(1, 'Assignment 1', "TODO", 1, 'Description 1', new Date(), new Date(), new Date(), 1),
    new Assignment(2, 'Assignment 2', "TODO", 1, 'Description 2', new Date(), new Date(), new Date(), 1),
    new Assignment(3, 'Assignment 3', "In progress", 1, 'Description 3', new Date(), new Date(), new Date(), 1),
    new Assignment(4, 'Assignment 4', "In progress", 1, 'Description 4', new Date(), new Date(), new Date(), 1),
    new Assignment(5, 'Assignment 5', "Done", 1, 'Description 5', new Date(), new Date(), new Date(), 1),
    new Assignment(6, 'Assignment 6', "Done", 1, 'Description 6', new Date(), new Date(), new Date(), 1)
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

app.get('/Board/All', (req: Request, res: Response) => {

    res.send(boards);
});

app.get('/assignment/:boardId', (req: Request, res: Response) => {
    const boardId = req.params.boardId;
    res.send(assignments);
})

app.post('/assignments/:courseId', (req, res) => {
    const courseId = req.params.courseId;
    const assignment = new Assignment(0, req.body.name, req.body.status, req.body.courseId, req.body.description, req.body.dueDate, req.body.createdAt, req.body.updatedAt, req.body.submission);
    assignments.push(assignment);
    res.send(assignment);
})

app.listen(port, () => {
    console.log(`Mock server listening at http://localhost:${port}`);
});

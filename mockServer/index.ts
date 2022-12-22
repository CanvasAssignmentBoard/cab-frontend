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
    try {

        console.log(req);
        if (!req.body) {
            throw new Error("Missing request Body");
        }
        const schema = joi.object().keys({
            name: joi.string().min(3).max(200).required(),
            status: joi.string().required(),
            description: joi.string(),
            dueDate: joi.date().required(),
            submission: joi.string().required()
        })

        const paramResult = joi.number().required().messages({'number.base': "Invalid course id"}).validate(req.params.courseId);

        if (paramResult.error) {
            throw new Error(paramResult.error.details[0].message);
        }

        const result = schema.validate(req.body);

        if (result.error) {
            throw new Error(result.error.details[0].message);
        }

        const courseId = req.params.courseId as unknown as number;
        const assignment = new Assignment(0, req.body.name, req.body.status, courseId, req.body.description, [], req.body.dueDate, new Date(Date.now()), new Date(Date.now()), req.body.submission);
        assignments.push(assignment);
        res.send(assignment);
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
            res.status(400).send(err.message);
            return;
        }else {
            console.error(err);
            res.status(400).send(err);
        }
    }

})

app.listen(port, () => {
    console.log(`Mock server listening at http://localhost:${port}`);
});

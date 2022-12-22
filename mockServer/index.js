"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const assignment_1 = __importDefault(require("./models/assignment"));
const joi_1 = __importDefault(require("joi"));
const courses_1 = __importDefault(require("./data/courses"));
const boards_1 = __importDefault(require("./data/boards"));
const assignments_1 = __importDefault(require("./data/assignments"));
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
app.get('/Board/All', (req, res) => {
    res.send(boards_1.default);
});
app.get('/assignment/:boardId', (req, res) => {
    const boardId = req.params.boardId;
    const board = boards_1.default.find(board => board.id === parseInt(boardId));
    console.log(board);
    if (board) {
        res.send(assignments_1.default.filter(assignment => board.courses.map(course => course.id).includes(assignment.courseId)));
    }
});
app.get('/course/:courseId', (req, res) => {
    const courseId = req.params.courseId;
    res.send(courses_1.default.filter(course => course.id === parseInt(courseId)));
});
app.get('/course', (req, res) => {
    res.send(courses_1.default);
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
        assignments_1.default.push(assignment);
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

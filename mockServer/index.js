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
app.get('/Board/All', (req, res) => {
    const boards = [
        new board_1.default(1, 'Board 1'),
        new board_1.default(2, 'Board 2'),
        new board_1.default(3, 'Board 3')
    ];
    res.send(boards);
});
app.get('/assignment/:boardId', (req, res) => {
    const boardId = req.params.boardId;
    const assignments = [
        new assignment_1.default(1, 'Assignment 1', "TODO", 1, 'Description 1', new Date(), new Date(), new Date(), 1),
        new assignment_1.default(2, 'Assignment 2', "TODO", 1, 'Description 2', new Date(), new Date(), new Date(), 1),
        new assignment_1.default(3, 'Assignment 3', "In progress", 1, 'Description 3', new Date(), new Date(), new Date(), 1),
        new assignment_1.default(4, 'Assignment 4', "In progress", 1, 'Description 4', new Date(), new Date(), new Date(), 1),
        new assignment_1.default(5, 'Assignment 5', "Done", 1, 'Description 5', new Date(), new Date(), new Date(), 1),
        new assignment_1.default(6, 'Assignment 6', "Done", 1, 'Description 6', new Date(), new Date(), new Date(), 1)
    ];
    res.send(assignments);
});
app.listen(port, () => {
    console.log(`Mock server listening at http://localhost:${port}`);
});

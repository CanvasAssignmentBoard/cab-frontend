"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBoard = exports.getBoard = exports.getBoards = void 0;
const joi_1 = __importDefault(require("joi"));
const boards_1 = __importStar(require("../data/boards"));
const assignmentColumns_1 = __importStar(require("../data/assignmentColumns"));
const columns_1 = __importStar(require("../data/columns"));
const assignments_1 = __importDefault(require("../data/assignments"));
const courses_1 = __importDefault(require("../data/courses"));
const board_1 = __importDefault(require("../models/board"));
const column_1 = __importDefault(require("../models/column"));
const assignmentColumns_2 = __importDefault(require("../models/assignmentColumns"));
function getAssignmentsFromColumnWithIndex(columnId) {
    let as = [];
    assignmentColumns_1.default.filter(ac => ac.columnId === columnId).forEach(ac => {
        let assignment = assignments_1.default.find(a => a.id === ac.assignmentId);
        as.push(Object.assign(Object.assign({}, assignment), { index: ac.index }));
    });
    return as;
}
function getBoards(req, res) {
    try {
        let boardar = [];
        boards_1.default.forEach(b => {
            let cs = [];
            b.courses.forEach(c => {
                let a = assignments_1.default.filter(a => a.courseId === c.id);
                a.forEach(a => {
                    let acheck = assignmentColumns_1.default.find(ac => ac.assignmentId === a.id);
                    if (acheck === undefined) {
                        assignmentColumns_1.default.push(new assignmentColumns_2.default((0, assignmentColumns_1.getLastAssignmentColumnsId)(), b.columns.find(c => c.status === a.status).id, a.id, (0, assignmentColumns_1.getNextIndex)(b.columns.find(c => c.status === a.status).id)));
                    }
                });
            });
            columns_1.default.filter(c => c.boardId === b.id).forEach(c => {
                let a = [];
                assignmentColumns_1.default.filter(ac => ac.columnId === c.id).forEach(ac => {
                    let assignment = assignments_1.default.find(a => a.id === ac.assignmentId);
                    a.push(assignment);
                });
                let column = {
                    id: c.id,
                    name: c.name,
                    assignments: a,
                    status: c.status,
                };
                cs.push(column);
            });
            boardar.push({
                id: b.id,
                name: b.name,
                columns: cs,
            });
        });
        res.send(boardar);
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
            res.status(404).send(err.message);
            return;
        }
        console.log(err);
    }
}
exports.getBoards = getBoards;
function getBoard(req, res) {
    try {
        const boardId = Number(req.params.boardId);
        if (!boardId) {
            throw new Error("Board not found");
        }
        const board = boards_1.default.find(board => board.id === Number(boardId));
        if (!board) {
            throw new Error("Board not found");
        }
        let cs = [];
        board.courses.forEach(c => {
            let a = assignments_1.default.filter(a => a.courseId === c.id);
            a.forEach(a => {
                let acheck = assignmentColumns_1.default.find(ac => ac.assignmentId === a.id);
                if (acheck === undefined) {
                    assignmentColumns_1.default.push(new assignmentColumns_2.default((0, assignmentColumns_1.getLastAssignmentColumnsId)(), board.columns.find(c => c.status === a.status).id, a.id, (0, assignmentColumns_1.getNextIndex)(board.columns.find(c => c.status === a.status).id)));
                }
            });
        });
        columns_1.default.filter(c => c.boardId === boardId).forEach(c => {
            let a = [];
            assignmentColumns_1.default.filter(ac => ac.columnId === c.id).forEach(ac => {
                let assignment = assignments_1.default.find(a => a.id === ac.assignmentId);
                let c = board.courses.find(c => c.id === assignment.courseId);
                if (c !== undefined) {
                    a.push(Object.assign(Object.assign({}, assignment), { index: ac.index }));
                }
            });
            let column = {
                id: c.id,
                name: c.name,
                assignments: a,
                status: c.status,
            };
            cs.push(column);
        });
        res.send({
            id: board.id,
            name: board.name,
            columns: cs,
        });
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
            res.status(404).send(err.message);
            return;
        }
        console.log(err);
    }
}
exports.getBoard = getBoard;
function createBoard(req, res) {
    try {
        if (!req.body) {
            throw new Error("Missing request Body");
        }
        const schema = joi_1.default.object({
            name: joi_1.default.string().required(),
            courses: joi_1.default.array().items(joi_1.default.number()).required(),
            columns: joi_1.default.array().items(joi_1.default.object({
                name: joi_1.default.string().required(),
                status: joi_1.default.string().required(),
            })).required(),
        });
        const { error, value } = schema.validate(req.body);
        if (error) {
            throw new Error(error.message);
        }
        let cc = courses_1.default.filter(c => value.courses.includes(c.id));
        let board = new board_1.default((0, boards_1.getNewBoardId)(), value.name, cc, []);
        value.columns.forEach((c) => {
            let column = new column_1.default((0, columns_1.getNewColumnId)(), c.name, c.status, board.id);
            columns_1.default.push(column);
            board.columns.push(column);
        });
        board.courses.forEach(c => {
            let as = assignments_1.default.filter(a => a.courseId === c.id);
            as.forEach(a => {
                let ac = new assignmentColumns_2.default((0, assignmentColumns_1.getLastAssignmentColumnsId)(), board.columns.find(c => c.status === a.status).id, a.id, (0, assignmentColumns_1.getNextIndex)(board.columns.find(c => c.status === a.status).id));
                assignmentColumns_1.default.push(ac);
            });
        });
        board.columns.forEach((c, i) => {
            let a = getAssignmentsFromColumnWithIndex(c.id);
            board.columns[i] = Object.assign(Object.assign({}, board.columns[i]), { assignments: a });
        });
        boards_1.default.push(board);
        res.status(201).send(board);
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
            res.status(404).send(err.message);
            return;
        }
        console.log(err);
    }
}
exports.createBoard = createBoard;

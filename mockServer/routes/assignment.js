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
exports.moveAssignment = exports.createAssignment = void 0;
const assignments_1 = __importStar(require("../data/assignments"));
const joi_1 = __importDefault(require("joi"));
const assignment_1 = __importDefault(require("../models/assignment"));
const columns_1 = __importDefault(require("../data/columns"));
const courses_1 = __importDefault(require("../data/courses"));
const boards_1 = __importDefault(require("../data/boards"));
const assignmentColumns_1 = __importStar(require("../data/assignmentColumns"));
const assignmentColumns_2 = __importDefault(require("../models/assignmentColumns"));
function createAssignment(req, res) {
    try {
        if (!req.body) {
            throw new Error("Missing request Body");
        }
        const boardId = req.params.boardId;
        if (!boardId) {
            throw new Error("Board not found");
        }
        const board = boards_1.default.find(board => board.id === Number(boardId));
        if (!board) {
            throw new Error("Board not found");
        }
        const schema = joi_1.default.object({
            name: joi_1.default.string().required(),
            status: joi_1.default.string().required(),
            description: joi_1.default.string().required(),
            dueDate: joi_1.default.date(),
            courseId: joi_1.default.number().required(),
            submission: joi_1.default.string().required(),
        });
        const { error, value } = schema.validate(req.body);
        if (error) {
            throw new Error(error.message);
        }
        let courseId = value.courseId;
        let course = courses_1.default.find(course => course.id === courseId);
        let assignment;
        if (!course) {
            throw new Error("Course not found");
        }
        if (course) {
            assignment = new assignment_1.default((0, assignments_1.getNewAssignmentId)(), value.name, value.status, value.courseId, value.description, [], value.dueDate, new Date(Date.now()), new Date(Date.now()), value.submission);
            assignments_1.default.push(assignment);
            let column = board.columns[0];
            let columnIndex = columns_1.default.findIndex(c => c.id === column.id);
            columns_1.default[columnIndex] = column;
            let boardIndex = boards_1.default.findIndex(b => b.id === board.id);
            board.columns[0] = column;
            boards_1.default[boardIndex] = board;
            assignmentColumns_1.default.push(new assignmentColumns_2.default((0, assignmentColumns_1.getLastAssignmentColumnsId)(), column.id, assignment.id, (0, assignmentColumns_1.getNextIndex)(column.id)));
            res.status(201).send(assignment);
            return;
        }
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
            res.status(404).send(err.message);
            return;
        }
        else {
            console.log(err);
        }
    }
}
exports.createAssignment = createAssignment;
function moveAssignment(req, res) {
    try {
        if (!req.body) {
            throw new Error("Missing request Body");
        }
        const assignmentId = req.params.assignmentId;
        if (!assignmentId) {
            throw new Error("Assignment not found");
        }
        const assignment = assignments_1.default.find(a => a.id === Number(assignmentId));
        if (!assignment) {
            throw new Error("Assignment not found");
        }
        const schema = joi_1.default.object({
            sourceColumnId: joi_1.default.number().required(),
            sourceIndex: joi_1.default.number().required(),
            destinationColumnId: joi_1.default.number().required(),
            destinationIndex: joi_1.default.number().required(),
        });
        const { error, value } = schema.validate(req.body);
        if (error) {
            throw new Error(error.message);
        }
        let sourceColumnIndex = columns_1.default.findIndex(c => c.id === value.sourceColumnId);
        let destinationColumnIndex = columns_1.default.findIndex(c => c.id === value.destinationColumnId);
        if (sourceColumnIndex === -1 || destinationColumnIndex === -1) {
            throw new Error("Column not found");
        }
        if (sourceColumnIndex === destinationColumnIndex) {
            let sourceColumn = columns_1.default[sourceColumnIndex];
            let assignmentSourceIndex = assignmentColumns_1.default.findIndex(ac => ac.assignmentId === assignment.id && ac.columnId === sourceColumn.id);
            let assignmentSourceSelected = assignmentColumns_1.default[assignmentSourceIndex];
            assignmentSourceSelected.index = value.destinationIndex;
            assignmentColumns_1.default[assignmentSourceIndex] = assignmentSourceSelected;
            assignmentColumns_1.default.filter(ac => ac.columnId === sourceColumn.id && ac.assignmentId != assignment.id).forEach(ac => {
                if (ac.columnId === sourceColumn.id && value.sourceIndex > value.destinationIndex && ac.index >= value.destinationIndex && ac.index < value.sourceIndex) {
                    ac.index++;
                }
                else if (ac.columnId == sourceColumn.id && value.sourceIndex < value.destinationIndex && ac.index <= value.destinationIndex && ac.index > value.sourceIndex) {
                    ac.index--;
                }
            });
            res.status(204).send();
            return;
        }
        else {
            let sourceColumn = columns_1.default[sourceColumnIndex];
            let destinationColumn = columns_1.default[destinationColumnIndex];
            let assignmentSourceIndex = assignmentColumns_1.default.findIndex(ac => ac.assignmentId === assignment.id && ac.columnId === sourceColumn.id);
            let assignmentSourceSelected = assignmentColumns_1.default[assignmentSourceIndex];
            assignmentSourceSelected.columnId = destinationColumn.id;
            assignmentSourceSelected.index = value.destinationIndex;
            assignmentColumns_1.default[assignmentSourceIndex] = assignmentSourceSelected;
            assignmentColumns_1.default.filter(ac => ac.columnId === destinationColumn.id && ac.assignmentId != assignment.id).forEach(ac => {
                if (ac.columnId === sourceColumn.id && ac.index > value.sourceIndex) {
                    ac.index--;
                }
                else if (ac.columnId === destinationColumn.id && ac.index >= value.destinationIndex) {
                    ac.index++;
                }
            });
            assignmentColumns_1.default.filter(ac => ac.columnId === sourceColumn.id && ac.assignmentId != assignment.id).forEach(ac => {
                if (ac.columnId === sourceColumn.id && ac.index > value.sourceIndex) {
                    ac.index--;
                }
            });
            res.status(204).send();
            return;
        }
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
            res.status(404).send(err.message);
            return;
        }
        else {
            console.log(err);
        }
    }
}
exports.moveAssignment = moveAssignment;

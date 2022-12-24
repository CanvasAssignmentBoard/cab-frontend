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
exports.deleteTask = exports.getTaskByAssignment = exports.getTasks = exports.updateTask = exports.createTask = void 0;
const assignments_1 = __importDefault(require("../data/assignments"));
const tasks_1 = __importStar(require("../data/tasks"));
const task_1 = __importDefault(require("../models/task"));
const joi_1 = __importDefault(require("joi"));
function createTask(req, res) {
    try {
        if (!req.body) {
            throw new Error("Missing request Body");
        }
        const schema = joi_1.default.object({
            name: joi_1.default.string().required(),
            description: joi_1.default.string().required(),
            assignmentId: joi_1.default.number().required(),
            checked: joi_1.default.boolean().default(false)
        });
        const { error, value } = schema.validate(req.body);
        if (error) {
            throw new Error(error.message);
        }
        let assignmentId = value.assignmentId;
        let assignment = assignments_1.default.find(assignment => assignment.id === assignmentId);
        let task;
        if (!assignment) {
            throw new Error("Assignment not found");
        }
        if (assignment) {
            task = new task_1.default((0, tasks_1.getNewTaskId)(), value.name, value.description, value.assignmentId, new Date(Date.now()), new Date(Date.now()), value.checked);
            tasks_1.default.push(task);
            assignment.tasks.push(task);
            res.status(201).send(task);
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
exports.createTask = createTask;
function updateTask(req, res) {
    var _a, _b, _c;
    try {
        if (!req.body) {
            throw new Error("Missing request Body");
        }
        const schema = joi_1.default.object({
            id: joi_1.default.number().required(),
            name: joi_1.default.string(),
            description: joi_1.default.string(),
            checked: joi_1.default.boolean()
        });
        const { error, value } = schema.validate(req.body);
        if (error) {
            throw new Error(error.message);
        }
        // let assignmentId = value.assignmentId;
        let task = tasks_1.default.find(task => task.id === value.id);
        if (!task || task === undefined) {
            throw new Error("Task not found");
        }
        if (task instanceof task_1.default) {
            let assignment = assignments_1.default.find(assignment => assignment.id === task.assignmentId);
            if (!assignment) {
                throw new Error("Assignment not found");
            }
            if (assignment) {
                task.name = (_a = value.name) !== null && _a !== void 0 ? _a : task.name;
                task.description = (_b = value.description) !== null && _b !== void 0 ? _b : task.description;
                task.checked = (_c = value.checked) !== null && _c !== void 0 ? _c : task.checked;
                task.updatedAt = new Date(Date.now());
                let index = tasks_1.default.findIndex(task => task.id === value.id);
                tasks_1.default[index] = task;
                assignment.tasks[index] = task;
                res.status(200).send(task);
                return;
            }
        }
        else {
            throw new Error("Task not found");
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
exports.updateTask = updateTask;
function getTasks(req, res) {
    res.status(200).send(tasks_1.default);
}
exports.getTasks = getTasks;
function getTaskByAssignment(req, res) {
    let id = parseInt(req.params.assignmentId);
    let assignment = assignments_1.default.find(assignment => assignment.id === id);
    if (assignment) {
        res.status(200).send(assignment.tasks);
        return;
    }
    res.status(404).send("Assignment not found");
}
exports.getTaskByAssignment = getTaskByAssignment;
function deleteTask(req, res) {
    let id = parseInt(req.params.taskId);
    let task = tasks_1.default.find(task => task.id === id);
    if (task instanceof task_1.default) {
        let assignment = assignments_1.default.find(assignment => assignment.id === task.assignmentId);
        if (assignment) {
            let index = tasks_1.default.findIndex(task => task.id === id);
            tasks_1.default.splice(index, 1);
            assignment.tasks.splice(index, 1);
            res.status(204).send();
            return;
        }
    }
}
exports.deleteTask = deleteTask;

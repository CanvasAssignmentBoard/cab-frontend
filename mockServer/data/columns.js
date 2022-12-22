"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const column_1 = __importDefault(require("../models/column"));
const statuses_1 = __importDefault(require("../statuses"));
const assignments_1 = __importDefault(require("./assignments"));
const columns = [
    new column_1.default(1, '🔵 Todo', assignments_1.default.filter(assignment => assignment.status === statuses_1.default.todo), statuses_1.default.todo),
    new column_1.default(2, '🔴 In progress', assignments_1.default.filter(assignment => assignment.status === statuses_1.default.inProgress), statuses_1.default.inProgress),
    new column_1.default(3, '⚪ Done', assignments_1.default.filter(assignment => assignment.status === statuses_1.default.done), statuses_1.default.done),
];
exports.default = columns;

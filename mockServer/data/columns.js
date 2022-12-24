"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNewColumnId = void 0;
const column_1 = __importDefault(require("../models/column"));
const statuses_1 = __importDefault(require("../statuses"));
const columns = [
    new column_1.default(1, 'Todo', statuses_1.default.todo, 1),
    new column_1.default(2, 'In progress', statuses_1.default.inProgress, 1),
    new column_1.default(3, 'Done', statuses_1.default.done, 1),
    new column_1.default(4, 'Done & Review', statuses_1.default.done, 1)
];
function getNewColumnId() {
    if (columns.length === 0)
        return 1;
    return Math.max(...columns.map(column => column.id)) + 1;
}
exports.getNewColumnId = getNewColumnId;
exports.default = columns;

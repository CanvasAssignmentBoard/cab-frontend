"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextIndex = exports.getLastAssignmentColumnsId = void 0;
const assignmentColumns_1 = __importDefault(require("../models/assignmentColumns"));
const assignments_1 = __importDefault(require("./assignments"));
const columns_1 = __importDefault(require("./columns"));
const statuses_1 = __importDefault(require("../statuses"));
const assignmentsColumns = [];
assignments_1.default.filter(a => a.status == statuses_1.default.todo).forEach(a => {
    assignmentsColumns.push(new assignmentColumns_1.default(getLastAssignmentColumnsId(), columns_1.default[0].id, a.id, getNextIndex(columns_1.default[0].id)));
});
assignments_1.default.filter(a => a.status == statuses_1.default.inProgress).forEach(a => {
    assignmentsColumns.push(new assignmentColumns_1.default(getLastAssignmentColumnsId(), columns_1.default[1].id, a.id, getNextIndex(columns_1.default[1].id)));
});
assignments_1.default.filter(a => a.status == statuses_1.default.done).forEach(a => {
    assignmentsColumns.push(new assignmentColumns_1.default(getLastAssignmentColumnsId(), columns_1.default[2].id, a.id, getNextIndex(columns_1.default[2].id)));
});
function getLastAssignmentColumnsId() {
    if (assignmentsColumns.length === 0)
        return 1;
    return Math.max(...assignmentsColumns.map(assignmentColumns => assignmentColumns.id)) + 1;
}
exports.getLastAssignmentColumnsId = getLastAssignmentColumnsId;
function getNextIndex(columnId) {
    return assignmentsColumns.filter(ac => ac.columnId == columnId).length;
}
exports.getNextIndex = getNextIndex;
exports.default = assignmentsColumns;

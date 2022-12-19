"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Task {
    constructor(id, name, description, assignmentId, createdAt, updatedAt, checked) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.assignmentId = assignmentId;
        this.checked = checked;
    }
}
exports.default = Task;

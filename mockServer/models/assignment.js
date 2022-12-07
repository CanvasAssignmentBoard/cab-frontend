"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Assignment {
    constructor(id, name, status, courseId, description, tasks, dueDate, createdAt, updatedAt, submission) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.description = description;
        this.tasks = tasks;
        this.dueDate = dueDate;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.submission = submission;
        this.courseId = courseId;
    }
}
exports.default = Assignment;

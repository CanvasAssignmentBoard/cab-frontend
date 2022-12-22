"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const course_1 = __importDefault(require("../models/course"));
const courses = [
    new course_1.default(1, 'Course 1', new Date(), new Date()),
    new course_1.default(2, 'Course 2', new Date(), new Date()),
    new course_1.default(3, 'Course 3', new Date(), new Date())
];
exports.default = courses;

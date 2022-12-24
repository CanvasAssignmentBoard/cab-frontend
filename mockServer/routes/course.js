"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCourses = void 0;
const courses_1 = __importDefault(require("../data/courses"));
function getCourses(req, res) {
    res.send(courses_1.default);
}
exports.getCourses = getCourses;

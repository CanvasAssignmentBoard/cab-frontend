"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const board_1 = __importDefault(require("../models/board"));
const courses_1 = __importDefault(require("./courses"));
const columns_1 = __importDefault(require("./columns"));
const boards = [
    new board_1.default(1, 'Board 1', courses_1.default, columns_1.default),
    new board_1.default(2, 'Board 2', [courses_1.default[0]], columns_1.default),
    new board_1.default(3, 'Board 3', [courses_1.default[1], courses_1.default[2]], columns_1.default),
];
exports.default = boards;

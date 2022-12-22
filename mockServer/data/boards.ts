import Board from "../models/board";
import courses from "./courses";

const boards = [
    new Board(1, 'Board 1', courses),
    new Board(2, 'Board 2', [courses[0]]),
    new Board(3, 'Board 3', [courses[1], courses[2]]),
];

export default boards;
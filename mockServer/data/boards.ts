import Board from "../models/board";
import courses from "./courses";
import columns from "./columns";

const boards = [
    new Board(1, 'Board 1', courses, columns),
    new Board(2, 'Board 2', [courses[0]], columns),
    new Board(3, 'Board 3', [courses[1], courses[2]], columns),
];

export function getNewBoardId() {
    if (boards.length === 0) return 1;
    return Math.max(...boards.map(board => board.id)) + 1;
}

export default boards;
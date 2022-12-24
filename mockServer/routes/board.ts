import joi from "joi";
import { Request, Response } from "express";
import boards, { getNewBoardId } from "../data/boards";
import assignmentColumns, { getLastAssignmentColumnsId, getNextIndex } from "../data/assignmentColumns";
import columns, { getNewColumnId } from "../data/columns";
import assignments from "../data/assignments";
import Assignment from "../models/assignment";
import courses from "../data/courses";
import Board from "../models/board";
import Column from "../models/column";
import AssignmentColumns from "../models/assignmentColumns";


function getAssignmentsFromColumnWithIndex(columnId: number): any[] {
    let as: any[] = [];
    assignmentColumns.filter(ac => ac.columnId === columnId).forEach(ac => {
        let assignment = assignments.find(a => a.id === ac.assignmentId) as Assignment;
        as.push({...assignment, index: ac.index});
    });

    return as;
}

export function getBoards(req: Request, res: Response) {
    try {
        let boardar: any[] = [];
        boards.forEach(b => {
            let cs: any[] = [];

            b.courses.forEach(c => {
                let a = assignments.filter(a => a.courseId === c.id);
                a.forEach(a => {
                    let acheck = assignmentColumns.find(ac => ac.assignmentId === a.id);
                    if (acheck === undefined) {
                        assignmentColumns.push(new AssignmentColumns(getLastAssignmentColumnsId(), (b.columns.find(c => c.status === a.status) as Column).id, a.id, getNextIndex((b.columns.find(c => c.status === a.status) as Column).id)));
                    }
                });
            });

            columns.filter(c => c.boardId === b.id).forEach(c => {
                let a: any[] = [];
                assignmentColumns.filter(ac => ac.columnId === c.id).forEach(ac => {
                    let assignment = assignments.find(a => a.id === ac.assignmentId) as Assignment;
                    a.push(assignment);
                });
                let column = {
                    id: c.id,
                    name: c.name,
                    assignments: a,
                    status: c.status,
                }
                cs.push(column);
            });

            boardar.push({
                id: b.id,
                name: b.name,
                columns: cs,
            })
        });
        res.send(boardar);        
    } catch (err) {

        if (err instanceof Error) {
            console.error(err.message);
            res.status(404).send(err.message);

            return;
        }   
        console.log(err);
    }

}

export function getBoard(req: Request, res: Response) {
    try {
        const boardId = Number(req.params.boardId);
        if (!boardId) {
            throw new Error("Board not found");
        }

        const board = boards.find(board => board.id === Number(boardId));
        if (!board) {
            throw new Error("Board not found");
        }

        let cs: any[] = [];

        board.courses.forEach(c => {
            let a = assignments.filter(a => a.courseId === c.id);
            a.forEach(a => {
                let acheck = assignmentColumns.find(ac => ac.assignmentId === a.id);
                if (acheck === undefined) {
                    assignmentColumns.push(new AssignmentColumns(getLastAssignmentColumnsId(), (board.columns.find(c => c.status === a.status) as Column).id, a.id, getNextIndex((board.columns.find(c => c.status === a.status) as Column).id)));
                }
            });
        });

        columns.filter(c => c.boardId === boardId).forEach(c => {
            let a: any[] = [];
            assignmentColumns.filter(ac => ac.columnId === c.id).forEach(ac => {
                let assignment = assignments.find(a => a.id === ac.assignmentId) as Assignment;
                let c = board.courses.find(c => c.id === assignment.courseId);
                if (c !== undefined) {
                    a.push({...assignment, index: ac.index});
                }
            });
            let column = {
                id: c.id,
                name: c.name,
                assignments: a,
                status: c.status,
            }
            cs.push(column);
        });

        
        res.send({
            id: board.id,
            name: board.name,
            columns: cs,
        });
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
            res.status(404).send(err.message);

            return;
        }   

        console.log(err);
    }
}

export function createBoard(req: Request, res: Response) {
    try {
        if (!req.body) {
            throw new Error("Missing request Body");
        }

        const schema = joi.object({
            name: joi.string().required(),
            courses: joi.array().items(joi.number()).required(),
            columns: joi.array().items(joi.object({
                name: joi.string().required(),
                status: joi.string().required(),
            })).required(),
        });

        const {error, value} = schema.validate(req.body);

        if (error) {
            throw new Error(error.message);
        }

        let cc = courses.filter(c => value.courses.includes(c.id));

        let board = new Board(getNewBoardId(), value.name, cc, []);

        value.columns.forEach((c: any) => {
            let column = new Column(getNewColumnId(), c.name, c.status, board.id);
            columns.push(column);
            board.columns.push(column);
        });

        board.courses.forEach(c => {
            let as = assignments.filter(a => a.courseId === c.id);
            as.forEach(a => {
                let ac = new AssignmentColumns(getLastAssignmentColumnsId(), (board.columns.find(c => c.status === a.status) as Column).id, a.id, getNextIndex((board.columns.find(c => c.status === a.status) as Column).id));
                assignmentColumns.push(ac);
            });
        });

        board.columns.forEach((c, i) => {
            let a = getAssignmentsFromColumnWithIndex(c.id);
            (board as any).columns[i] = {...board.columns[i], assignments: a}
        });

        boards.push(board);

        res.status(201).send(board);
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
            res.status(404).send(err.message);

            return;
        }   

        console.log(err);
    }
}
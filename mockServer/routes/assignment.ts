import assignments, {getNewAssignmentId} from "../data/assignments";
import {Request, Response} from "express";
import joi from "joi";
import Assignment from "../models/assignment";
import columns from "../data/columns";
import courses from "../data/courses";
import boards from "../data/boards";
import Course from "../models/course";
import assignmentsColumns, { getLastAssignmentColumnsId, getNextIndex } from "../data/assignmentColumns";
import assignmentColumns from "../models/assignmentColumns";
import AssignmentColumns from "../models/assignmentColumns";

export function createAssignment(req: Request, res: Response) {
    try {
        if (!req.body) {
            throw new Error("Missing request Body");
        }

        const boardId = req.params.boardId;
        if (!boardId) {
            throw new Error("Board not found");
        }

        const board = boards.find(board => board.id === Number(boardId));
        if (!board) {
            throw new Error("Board not found");
        }

        const schema = joi.object({
            name: joi.string().required(),
            status: joi.string().required(),
            description: joi.string().required(),
            dueDate: joi.date(),
            courseId: joi.number().required(),
            submission: joi.string().required(),
        });

        const {error, value} = schema.validate(req.body);

        if (error) {
            throw new Error(error.message);
        }

        let courseId = value.courseId;
        let course = courses.find(course => course.id === courseId);
        let assignment: Assignment;

        if (!course) {
            throw new Error("Course not found");
        }

        if (course) {
            assignment = new Assignment(
                getNewAssignmentId(),
                value.name,
                value.status,
                value.courseId,
                value.description,
                [],
                value.dueDate,
                new Date(Date.now()),
                new Date(Date.now()),
                value.submission
            );
    
            assignments.push(assignment);
            let column = board.columns[0];

            let columnIndex = columns.findIndex(c => c.id === column.id);
            columns[columnIndex] = column;

            let boardIndex = boards.findIndex(b => b.id === board.id);
            board.columns[0] = column;
            boards[boardIndex] = board;

            assignmentsColumns.push(new assignmentColumns(getLastAssignmentColumnsId(), column.id, assignment.id, getNextIndex(column.id)))
    
            res.status(201).send(assignment);
            return;
        }
    }catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
            res.status(404).send(err.message);

            return;
        }else {
            console.log(err);
        }
    }
}

export function moveAssignment(req: Request, res: Response) {
    try {
        if (!req.body) {
            throw new Error("Missing request Body");
        }

        const assignmentId = req.params.assignmentId;
        if (!assignmentId) {
            throw new Error("Assignment not found");
        }

        const assignment = assignments.find(a => a.id === Number(assignmentId));
        if (!assignment) {
            throw new Error("Assignment not found");
        }

        const schema = joi.object({
            sourceColumnId: joi.number().required(),
            sourceIndex: joi.number().required(),
            destinationColumnId: joi.number().required(),
            destinationIndex: joi.number().required(),
        });

        const {error, value} = schema.validate(req.body);

        if (error) {
            throw new Error(error.message);
        }

        let sourceColumnIndex = columns.findIndex(c => c.id === value.sourceColumnId);
        let destinationColumnIndex = columns.findIndex(c => c.id === value.destinationColumnId);

        if (sourceColumnIndex === -1 || destinationColumnIndex === -1) {
            throw new Error("Column not found");
        }

        if (sourceColumnIndex === destinationColumnIndex) {
            let sourceColumn = columns[sourceColumnIndex];
            let assignmentSourceIndex = (assignmentsColumns.findIndex(ac => ac.assignmentId === assignment.id && ac.columnId === sourceColumn.id) as number);
            let assignmentSourceSelected = assignmentsColumns[assignmentSourceIndex];

            assignmentSourceSelected.index = value.destinationIndex;
            assignmentsColumns[assignmentSourceIndex] = assignmentSourceSelected;

            assignmentsColumns.filter(ac => ac.columnId === sourceColumn.id && ac.assignmentId != assignment.id).forEach(ac => {
                if (ac.columnId === sourceColumn.id && value.sourceIndex > value.destinationIndex && ac.index >= value.destinationIndex &&  ac.index < value.sourceIndex) {
                    ac.index++;
                } else if (ac.columnId == sourceColumn.id && value.sourceIndex < value.destinationIndex && ac.index <= value.destinationIndex && ac.index > value.sourceIndex) {
                    ac.index--;
                }
            });

            res.status(204).send();

            return;
        }else {
            let sourceColumn = columns[sourceColumnIndex];
            let destinationColumn = columns[destinationColumnIndex];

            let assignmentSourceIndex = (assignmentsColumns.findIndex(ac => ac.assignmentId === assignment.id && ac.columnId === sourceColumn.id) as number);
            let assignmentSourceSelected = assignmentsColumns[assignmentSourceIndex];

            assignmentSourceSelected.columnId = destinationColumn.id;
            assignmentSourceSelected.index = value.destinationIndex;
            assignmentsColumns[assignmentSourceIndex] = assignmentSourceSelected;

            assignmentsColumns.filter(ac => ac.columnId === destinationColumn.id && ac.assignmentId != assignment.id).forEach(ac => {
                if (ac.columnId === sourceColumn.id && ac.index > value.sourceIndex) {
                    ac.index--;
                }else if (ac.columnId === destinationColumn.id && ac.index >= value.destinationIndex) {
                    ac.index++;
                }
            });

            assignmentsColumns.filter(ac => ac.columnId === sourceColumn.id && ac.assignmentId != assignment.id).forEach(ac => {
                if (ac.columnId === sourceColumn.id && ac.index > value.sourceIndex) {
                    ac.index--;
                }
            });	

            res.status(204).send();
            return;
        }

    }catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
            res.status(404).send(err.message);

            return;
        }else {
            console.log(err);
        }
    }
    
}
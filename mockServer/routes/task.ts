import assignments from '../data/assignments';
import tasks, {getNewTaskId} from '../data/tasks';
import Task from '../models/task';
import {Request, Response} from 'express';
import joi from 'joi';

export function createTask(req: Request, res: Response) {
    try {
        if (!req.body) {
            throw new Error("Missing request Body");
        }

        const schema = joi.object({
            name: joi.string().required(),
            description: joi.string().required(),
            assignmentId: joi.number().required(),
            checked: joi.boolean().default(false)
        });

        const {error, value} = schema.validate(req.body);

        if (error) {
            throw new Error(error.message);
        }

        let assignmentId = value.assignmentId;
        let assignment = assignments.find(assignment => assignment.id === assignmentId);
        let task: Task;

        if (!assignment) {
            throw new Error("Assignment not found");
        }

        if (assignment) {
            task = new Task(getNewTaskId(), value.name, value.description, value.assignmentId, new Date(Date.now()), new Date(Date.now()), value.checked);
    
            tasks.push(task);
            assignment.tasks.push(task);
    
            res.status(201).send(task);
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

export function updateTask(req: Request, res: Response) {
    try {
        if (!req.body) {
            throw new Error("Missing request Body");
        }

        const schema = joi.object({
            id: joi.number().required(),
            name: joi.string(),
            description: joi.string(),
            checked: joi.boolean()
        });

        const {error, value} = schema.validate(req.body);

        if (error) {
            throw new Error(error.message);
        }

        // let assignmentId = value.assignmentId;
        
        let task = tasks.find(task => task.id === value.id);

        if (!task || task === undefined) {
            throw new Error("Task not found");
        }

        if (task instanceof Task) {
            let assignment = assignments.find(assignment => assignment.id === (task as Task).assignmentId);
        
            if (!assignment) {
                throw new Error("Assignment not found");
            }
    
            if (assignment) {
    

                task.name = value.name ?? task.name;
                task.description = value.description ?? task.description;
                task.checked = value.checked ?? task.checked;
                task.updatedAt = new Date(Date.now());
        
                let index = tasks.findIndex(task => task.id === value.id);
                tasks[index] = task;
                assignment.tasks[index] = task;
        
                res.status(200).send(task);
                return;
            }
        }else {
            throw new Error("Task not found");
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
export function getTasks(req: Request, res: Response) {
    res.status(200).send(tasks);
}

export function getTaskByAssignment(req: Request, res: Response) {
    let id = parseInt(req.params.assignmentId);

    let assignment = assignments.find(assignment => assignment.id === id);
    if (assignment) {
        res.status(200).send(assignment.tasks);
        return;
    }

    res.status(404).send("Assignment not found");
}

export function deleteTask(req: Request, res: Response) {
    let id = parseInt(req.params.taskId);

    let task = tasks.find(task => task.id === id);
    if (task instanceof Task) {
        let assignment = assignments.find(assignment => assignment.id === (task as Task).assignmentId);
        if (assignment) {
            let index = tasks.findIndex(task => task.id === id);
            tasks.splice(index, 1);
            assignment.tasks.splice(index, 1);
            res.status(204).send();
            return;
        }
    }
}
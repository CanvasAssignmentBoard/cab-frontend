import courses from "../data/courses";
import {Request, Response} from "express";

export function getCourses(req: Request, res: Response) {
    res.send(courses);
}
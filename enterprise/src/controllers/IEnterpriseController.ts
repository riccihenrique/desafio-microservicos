import { NextFunction, Request, Response } from "express";

export default interface IEnterpriseController {
    create(req: Request, res: Response, next: NextFunction): Promise<void>;
    delete(req: Request, res: Response, next: NextFunction): Promise<void>;
    update(req: Request, res: Response, next: NextFunction): Promise<void>;
    findAll(req: Request, res: Response, next: NextFunction): Promise<void>;
    findById(req: Request, res: Response, next: NextFunction): Promise<void>;
};
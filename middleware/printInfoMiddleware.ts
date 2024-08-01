import express, { NextFunction, Request, Response } from "express";

const logRequestMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log(`$(new Date().toLocaleDateString()} - ${req.url} - ${req.method} - ${req.statusCode})`);
    next()
}

export { logRequestMiddleware }


import { NextFunction, Response } from "express";
import { ROLES } from "schema";


export function requireRole(name: ROLES) {
    return (req: any, res: Response, next: NextFunction) => {
        // Check if user is authenticated and has role information
        if (!req.user || !req.user.role) {
            res.status(401).json({ message: "Unauthorized: Missing required role information" });
            return
        }

        // Check if user has the required role
        if (req.user.role.name !== name) {
            res.status(400).json({ message: "Unauthorized: not allowed to perform thi action" });
            return
        }

        next();
    };
}

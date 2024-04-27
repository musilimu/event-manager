import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../../db/client";

interface ExtendedRequest extends Request {
    user?: unknown;
}
export async function auth(req: ExtendedRequest, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Unauthorized: Missing or invalid authorization header' });
        return
    }
    const token = authorizationHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.SECRET!)


        const user = await prisma.user.findFirst({
            where: {
                email: decoded as string
            },
            include: {
                role: {
                    include: {
                        Permissions: true
                    }
                }
            }
        })
        if (!user) {
            res.status(401).json({ message: 'user not found' });
            return
        }
        req.user = user

        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.status(401).json({ message: 'Unauthorized: Token expired' });
        } else if (error instanceof jwt.JsonWebTokenError) {
            res.status(401).json({ message: 'Unauthorized: Invalid token format' });
        } else {
            console.error('JWT validation error:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}
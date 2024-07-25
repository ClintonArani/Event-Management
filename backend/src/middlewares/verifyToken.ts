import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { token_datails } from "../interfaces/user.interface";

// Extend the Express Request interface to include token details
export interface extendedRequest extends Request {
    info?: token_datails;
}

// Middleware to verify JWT token
export const verifyToken = async (req: extendedRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json({
                error: "Authorization header is missing"
            });
        }

        const token = authHeader.split(' ')[1]; // Extract token from 'Bearer <token>' format
        if (!token) {
            return res.status(401).json({
                error: "Token is missing"
            });
        }

        try {
            // Verify the token using the secret key from environment variables
            const data = jwt.verify(token, process.env.SECRET_KEY as string) as token_datails;
            req.info = data; // Attach token data to the request
            next(); // Proceed to the next middleware or route handler
        } catch (err) {
            return res.status(401).json({
                error: "Invalid or expired token"
            });
        }
    } catch (error) {
        console.error("Token verification error:", error); // Detailed logging for debugging
        return res.status(401).json({
            error: "Authentication failed"
        });
    }
};
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { errorResponse } from '../utils/response.js';

export const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return errorResponse(res, 'Access token required', 401);
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        
        if (!user) {
            return errorResponse(res, 'Invalid token', 401);
        }

        req.user = user;
        next();
    } catch (error) {
        return errorResponse(res, 'Invalid token', 401);
    }
};

export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return errorResponse(res, 'Access denied', 403);
        }
        next();
    };
};

export const auth = authenticate;
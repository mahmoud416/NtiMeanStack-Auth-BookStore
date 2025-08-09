import jwt from 'jsonwebtoken';
import { CreateError } from './error.js';

export const verifyToken = (req, res, next) => {
    let token = null;
    // Try to get token from Authorization header (Bearer) or cookies
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.access_token) {
        token = req.cookies.access_token;
    }
    if (!token) {
        return next(CreateError(401, "You are not authenticated!"));
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(CreateError(403, "Token is not Valid"));
        } else {
            // Always set req.user and ensure isAdmin is boolean
            req.user = user;
            if (typeof req.user.isAdmin === 'undefined') req.user.isAdmin = false;
        }
        next();
    });
}

export const verifyUser = (req, res, next)=>{
    verifyToken(req, res, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            return next(CreateError(403, "You are not authorized!"))
        }
    })
}

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return next(CreateError(403, "You are not authorized!"))
        }
    })
}
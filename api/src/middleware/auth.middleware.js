import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config()
const {verify} = jwt

import asyncHandler from 'express-async-handler';
import db from '../models/index.js';

const {User, Token} = db;

const verifyToken = asyncHandler(async (req, res, next) => {
    const authHeader = req.header('Authorization')
    const accessToken = req.cookies['accessToken'] || (authHeader && authHeader.split(' ')[1])

    if (!accessToken) {
        return res.status(403).json({
            success: false,
            message: "Missing Access Token",
        });
    }

    verify(
        accessToken,
        process.env["JWT_SECRET_ACCESS_TOKEN"],
        (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    res.status(401);
                    throw new Error("Expired Access Token");
                } else {
                    res.status(401);
                    throw new Error("Invalid Access token");
                }
            }

            req.user = decoded;
            next();
        }
    );
})

const verifyRefreshToken = asyncHandler(async (req, res, next) => {
    const refreshToken = req.cookies['refreshToken']
    if (!refreshToken) {
        return res.status(403).json({
            success: false,
            message: "Missing Refresh Token",
        });
    }

    verify(
        refreshToken,
        process.env["JWT_SECRET_REFRESH_TOKEN"],
        async (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    res.status(401);
                    throw new Error("Expired Refresh Token");
                } else {
                    res.status(401);
                    throw new Error("Invalid Refresh token");
                }
            }

            const existingToken = await Token.findOne({
                where: {
                    user_id: decoded.userId,
                    token: refreshToken,
                    action: 'auth'
                }
            })

            if (!existingToken) {
                res.status(404)
                res.send("Invalid Refresh token");
            } else {
                req.user = decoded;
                next();
            }
        }
    );
})


export {verifyToken, verifyRefreshToken}

import jwt from "jsonwebtoken";
const {sign} = jwt
import { authConfig } from '../config/index.js';

const tokenGenerator = async (res, userId, email,) => {
    const accessToken = await sign(
        {userId, email},
        authConfig.jwt_access_token_secret,
        {
            expiresIn: "30m",
        }
    );

    const refreshToken = sign(
        {userId},
        authConfig.jwt_refresh_token_secret,
        {
            expiresIn: "15d",
        }
    );

    // Set access token in HTTP-only cookie
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "None",
    });

    // Set refresh token in HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "None",
    });

    return { accessToken, refreshToken };
}

export default tokenGenerator


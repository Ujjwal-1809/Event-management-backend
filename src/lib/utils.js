import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });

    res.cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        httpOnly: true, // Prevents XSS attacks
        sameSite: "None", // Allows cross-origin requests
        secure: true // Ensures cookies work over HTTPS
    });

    return token;
};

import jwt from 'jsonwebtoken';
import { userSchema as User } from "../models/userModel.js";

export const protectRoute = async(req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - Please log in to access this route." });
        }
 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid token provided." })
        }

        const user = await User.findById(decoded.userId).select("-password"); // exclude password
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
req.user = user; 
next();
    } catch (error) {
        console.log("Error in protectedRoute middleware", error.message);
        res.status(500).json({ message: "Internal server error" })
    }
}
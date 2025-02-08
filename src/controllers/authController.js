import { generateToken } from "../lib/utils.js";
import { userSchema as User } from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const handleSignup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        if (password.trim().length < 8) {
            return res.status(400).json({ message: "Password must be atleast 8 characters." });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Email already exists." })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save(); // save the user to the database.

            res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                profileImg: newUser.profileImg
            })
        } else {
            res.status(400).json('Invalid User Data')
        }
    } catch (error) {
        console.log('error in signup controller', error.message);
        res.status(500).json({ message: "Internal server error" })
    }
};

export async function handleLogin(req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (user) {
            const isCorrectPassword = await bcrypt.compare(password, user.password);
            if (isCorrectPassword) {
                generateToken(user._id, res);

                res.status(201).json({
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                })
            }
            else {
                return res.status(400).json({ message: "Invalid credentials" })
            }
        }
        else {
            return res.status(400).json({ message: "Invalid credentials" })
        }
    } catch (error) {
        console.log("error in login controller", error.message);
        res.status(500).json({ message: "Internal server error" })
    }
};

export function checkAuth(req, res) {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("error in Check auth controller", error.message);
        res.status(500).json({ message: "Internal server error" })
    }
};

export function handleLogout(req, res) {
    try {
    res.cookie("token", "", {maxAge:0})
    res.status(200).json({ message: "Logged out successfully" })
    } catch (error) {
        console.log("error in logout controller", error.message);
            res.status(500).json({ message: "Internal server error" })
    }}

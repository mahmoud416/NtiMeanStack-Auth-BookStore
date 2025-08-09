export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return next(CreateError(404, "User not found!"));
        }
        return next(CreateSuccess(200, "User deleted successfully!", user));
    } catch (error) {
        return next(CreateError(500, "Internal Server Error!"));
    }
}

export const addUser = async (req, res, next) => {
    try {
        const { firstName, lastName, username, email, password, isAdmin, roles } = req.body;
        if (!firstName || !lastName || !username || !email || !password || !roles) {
            return next(CreateError(400, "All fields are required!"));
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(CreateError(409, "User already exists!"));
        }
        const bcrypt = (await import('bcryptjs')).default;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            firstName,
            lastName,
            username,
            email,
            password: hashPassword,
            isAdmin: isAdmin || false,
            roles
        });
        await newUser.save();
        return next(CreateSuccess(201, "User added successfully!", newUser));
    } catch (error) {
        return next(CreateError(500, "Internal Server Error!"));
    }
}
import User from "../models/User.js";
import { CreateError } from "../utils/error.js"
import { CreateSuccess } from "../utils/success.js";

export const getAllUsers = async (req, res, next)=>{
    try {
        const users = await User.find();
        return next(CreateSuccess(200, "All Users", users));
    } catch (error) {
        return next(CreateError(500, "Internal Server Error!"));
    }
}

export const getById = async (req, res, next)=>{
    try {
        const user = await User.findById(req.params.id);
        if(!user)
            return next(CreateError(404, "User not found!"));
        return next(CreateSuccess(200, "Single User", user));
    } catch (error) {
        return next(CreateError(500, "Internal Server Error!"));
    }
}
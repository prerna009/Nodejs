import User from "../models/user.model.js";

// POST /users
export const createUser = async (req, res) => {
    try {
        const { name, email, age } = req.body;

        const user = await User.create({ name, email, age });

        if (!name?.trim() || !email?.trim()) {
            return res.status(400).json({
                message: "Name and email are required"
            });
        }

        res.status(201).json({
            message: "User created successfully",
            data: user
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        const status = ["ValidationError", "CastError"].includes(error.name) ? 400 : 500;

        res.status(status).json({
            message: error.message
        });
    }
};

// GET /users
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json({
            count: users.length,
            data: users
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// GET /users/:id
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({ data: user });
    } catch (error) {
        const status = error.name === "CastError" ? 400 : 500;
        res.status(status).json({
            message: error.message
        });
    }
};

// PATCH /users/:id
export const updateUser = async (req, res) => {
    try {
        const allowedFields = ["name", "email", "age"];
        const updates = {};

        for (const field of allowedFields) {
            if (Object.hasOwn(req.body, field)) {
                updates[field] = req.body[field];
            }
        }

        if ("name" in updates && !updates.name?.trim() ||
            "email" in updates && !updates.email?.trim()) {
            return res.status(400).json({
                message: "Name and email cannot be ready"
            });
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            updates,
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User updated successfully",
            data: user
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        const status = ["ValidationError", "CastError"].includes(error.name) ? 400 : 500;
        res.status(status).json({
            message: error.message
        });
    }
};

// DELETE /users/:id
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User deleted successully",
            data: user
        });
    } catch (error) {
        const status = error.name === "CastError" ? 400 : 500;
        res.status(status).json({
            message: error.message
        });
    }
};

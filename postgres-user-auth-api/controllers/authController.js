import pool from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function register(req, res, next) {
    try {
        const { name, email, password } = req.body;

        if (
            typeof name !== "string" || !name.trim()
            || typeof email !== "string" || !email.trim()
            || typeof password !== "string" || password.length < 8
            || Buffer.byteLength(password, "utf8") > 72
        ) {
            return res.status(400).json({
                message: "Enter a valid name, email or password"
            });
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const result = await pool.query(
            `INSERT INTO app_users (name, email, password_hash)
            VALUES ($1, $2, $3)
            RETURNING id, name, email, role, created_at`,
            [name.trim(), email.trim().toLowerCase(), passwordHash]
        );

        res.status(201).json({
            message: "Registration successul",
            user: result.rows[0]
        });
    } catch (error) {
        if (error.code === "23505") {
            return res.status(409).json({
                message: "An account with this email already exists"
            });
        }

        next(error);
    }
};

export async function login(req, res, next) {
    try {
        const { email, password } = req.body;

        if (
            typeof email !== "string" 
            || !email.trim()
            || typeof password !== "string" 
            || !password
            || Buffer.byteLength(password, "utf8") > 72
        ) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const result = await pool.query(
            `SELECT id, name, email, password_hash, role
            FROM app_users
            WHERE email = $1`,
            [email.trim().toLowerCase()]
        );

        const user = result.rows[0];

        if (!user || !(await bcrypt.compare(password, user.password_hash))) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                sub: String(user.id),
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "15m",
                algorithm: "HS256"
            }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        });
    } catch (error) {
        next(error);
    }
};

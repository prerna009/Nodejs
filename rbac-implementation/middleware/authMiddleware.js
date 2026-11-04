import jwt from "jsonwebtoken";
import pool from "../config/db.js";

export const authenticateUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Access token required"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const result = await pool.query(
            `SELECT p.name AS permission
            FROM user_roles ur
            JOIN role_permissions rp
            ON rp.role_id = ur.role_id
            JOIN permissions p
            ON p.id = rp.permission_id
            WHERE ur.user_id = $1`,
            [decoded.userId]
        );

        req.user = {
            id: decoded.userId,
            permissions: [
                ...new Set(result.rows.map(row => row.permission))
            ]
        };

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};
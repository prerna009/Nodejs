import express from "express";
import pool from "../config/db.js";

import { authenticateUser } from "../middleware/authMiddleware.js";
import { checkPermission } from "../middleware/permissionMiddleware.js";

const router = express.Router();

// every roue requires authentication
router.use(authenticateUser);

// create employee
router.post("/", checkPermission("employee:create"), async(req, res) => {
    try {
        const { name, email, department } = req.body;

        const result = await pool.query(
            `INSERT INTO employees (name, email, department)
            VALUES ($1, $2, $3)
            RETURNING *`,
            [name, email, department]
        );

        res.status(201).json({
            message: "Employee created successfully",
            employee: result.rows[0]
        });
    } catch (error) {
        res.status(error.code === "23505" ? 409 : 500).json({
            message: error.code === "23505"
            ? "Employee email already exists"
            : "Something went wrong"
        });
    }
});

// Get All employes
router.get("/", checkPermission("employee:read"), async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT * FROM employees ORDER BY id DESC`
        );

        res.json(result.rows);
    } catch (error) {
        res.status(500).json({
            message: "Unable to fetch employees"
        });
    }
});

// Update employee
router.put("/:id", checkPermission("employee:update"), async (req, res) => {
    try {
        const { name, email, department } = req.body;
        const { id } = req.params;

        const result = await pool.query(
            `UPDATE employees
            SET name = $1, email = $2, department = $3
            WHERE id = $4
            RETURNING *`,
            [name, email, department, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        res.json({
            message: "Employee updated successfully",
            employee: result.rows[0]
        });
    } catch (error) {
        res.status(error.code === "23505" ? 409 : 500).json({
            message: error.code === "23505" 
            ? "Employee email already exists"
            : "Unable to update employee"
        });
    }
});

// Delete Employee
router.delete("/:id", checkPermission("employee:delete"), async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            `DELETE FROM employees
            WHERE id = $1
            RETURNING *`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        res.json({
            message: "Employee deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Unable to delete employee"
        });
    }
});

export default router;
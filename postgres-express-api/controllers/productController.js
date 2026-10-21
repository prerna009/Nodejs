import pool from "../config/db.js";

export async function getProducts(req, res, next) {
    try {
        const result = await pool.query(
            "SELECT id, name, price, category, created_at from products ORDER BY id"
        );

        res.status(200).json({
            success: 200,
            count: result.rowCount,
            data: result.rows,
        });
    } catch (error) {
        next(error);
    }
};

export async function addProducts(req, res, next) {
    try {
        const { name, price, category } = req.body;

        if (
            typeof name !== "string" || !name.trim()
            || typeof category !== "string" || !category.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "Name and category are required"
            })
        }

        if (
            price !== undefined &&
            price !== null &&
            (!Number.isInteger(price) || price <= 0)
        ) {
            return res.status(400).json({
                success: false,
                message: "Price must be an integer and greater than 0"
            });
        }

        const result = await pool.query(
            `INSERT INTO products (name, price, category)
            VALUES ($1, $2, $3)
            RETURNING id, name, price, category, created_at`,
            [name.trim(), price ?? 0, category.trim()]
        );

        res.status(201).json({
            success: true,
            message: "Product added successfully",
            data: result.rows[0]
        });
    } catch (error) {
        next(error);
    }
}
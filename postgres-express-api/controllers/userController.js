
import pool from "../config/db.js";

// GET /api/users
export async function getUsers(req, res, next) {
  try {
    const result = await pool.query(
      "SELECT id, name, email, age, created_at FROM users ORDER BY id"
    );

    res.status(200).json({
      success: true,
      count: result.rowCount,
      data: result.rows
    });
  } catch (error) {
    next(error);
  }
}

// GET /api/users/:id
export async function getUserById(req, res, next) {
  try {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID"
      });
    }

    const result = await pool.query(
      "SELECT id, name, email, age, created_at FROM users WHERE id = $1",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
}

// POST /api/users
export async function createUser(req, res, next) {
  try {
    const { name, email, age } = req.body;

    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof email !== "string" ||
      !email.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required"
      });
    }

    if (
      age !== undefined &&
      age !== null &&
      (!Number.isInteger(age) || age < 18)
    ) {
      return res.status(400).json({
        success: false,
        message: "Age must be an integer of at least 18"
      });
    }

    const result = await pool.query(
      `INSERT INTO users (name, email, age)
       VALUES ($1, $2, $3)
       RETURNING id, name, email, age, created_at`,
      [name.trim(), email.trim().toLowerCase(), age ?? null]
    );

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
}

// PATCH /api/users/:id
export async function updateUser(req, res, next) {
  try {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID"
      });
    }

    const { name, email, age } = req.body;
    const updates = [];
    const values = [];

    if (Object.hasOwn(req.body, "name")) {
      if (typeof name !== "string" || !name.trim()) {
        return res.status(400).json({
          success: false,
          message: "Name must be a non-empty string"
        });
      }

      values.push(name.trim());
      updates.push(`name = $${values.length}`);
    }

    if (Object.hasOwn(req.body, "email")) {
      if (typeof email !== "string" || !email.trim()) {
        return res.status(400).json({
          success: false,
          message: "Email must be a non-empty string"
        });
      }

      values.push(email.trim().toLowerCase());
      updates.push(`email = $${values.length}`);
    }

    if (Object.hasOwn(req.body, "age")) {
      if (
        age !== null &&
        (!Number.isInteger(age) || age < 18)
      ) {
        return res.status(400).json({
          success: false,
          message: "Age must be null or an integer of at least 18"
        });
      }

      values.push(age);
      updates.push(`age = $${values.length}`);
    }

    if (updates.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Provide at least one valid field to update"
      });
    }

    values.push(id);

    const result = await pool.query(
      `UPDATE users
       SET ${updates.join(", ")}
       WHERE id = $${values.length}
       RETURNING id, name, email, age, created_at`,
      values
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
}

// DELETE /api/users/:id
export async function deleteUser(req, res, next) {
  try {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID"
      });
    }

    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING id",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully"
    });
  } catch (error) {
    next(error);
  }
}

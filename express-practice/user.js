// Create Express REST APIs

import express from "express";

const app = express();

app.use(express.json()); 

const users = [
    {
        id: 1,
        name: "John",
        email: "john@example.com"
    },
    {
        id: 2,
        name: "sara",
        email: "sara@example.com"
    }
];

// Get all users
app.get("/users", (req, res) => {
    res.json(users);
});

// Get user by id
app.get("/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);

    if (!user) {
        return res.json({
            message: "User not found"
        });
    }

    res.json(user);
});

// Create user
app.post("/users", (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            message: "Name and email are required"
        });
    }

    const newUser = {
        id: users.length + 1,
        name,
        email
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

// Update user
app.patch("/users/:id", (req, res) => {
    const id = Number(req.params.id);

    const user = users.find((user) => user.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    if (req.body.name !== undefined) {
        user.name = req.body.name;
    }

    if (req.body.email !== undefined) {
        user.email = req.body.email;
    }

    res.json(user);
});

// Delete user
app.delete("/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex((user) => user.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    users.splice(index, 1);
    
    // 204 - successful request, but no response body
    res.status(204).send(); 
})

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
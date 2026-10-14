export const getAllUsers = (req, res) => {
    res.json({
        message: "Get all users"
    });
};

export const getUser = (req, res) => {
    res.json({
        message: "Get user",
        id: req.params.id
    });
};

export const addUser = (req, res) => {
    res.status(201).json({
        message: "Create user",
        data: req.body
    });
};

export const updateUser = (req, res) => {
    res.json({
        message: "Update user",
        id: req.params.id,
        data: req.body,
    });
};

export const deleteUser = (req, res) => {
    res.json({
        message: "Delete user",
        id: req.params.id,
    });
};
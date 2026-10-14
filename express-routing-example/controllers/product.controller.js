export const getAllProducts = (req, res) => {
    res.json({
        message: "Get all products"
    });
};

export const getProduct = (req, res) => {
    res.json({
        message: "Get product",
        id: req.params.id
    });
};

export const addProduct = (req, res) => {
    res.status(201).json({
        message: "Create product",
        data: req.body
    });
};

export const updateProduct = (req, res) => {
    res.json({
        message: "Update product",
        id: req.params.id,
        data: req.body
    });
};

export const deleteProduct = (req, res) => {
    res.json({
        message: "Delete product",
        id: req.params.id
    });
};
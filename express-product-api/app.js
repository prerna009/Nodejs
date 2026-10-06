import express from "express";

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

const products = [
    {
        id: 1,
        name: "Laptop",
        price: 50000
    },
    {
        id: 2,
        name: "Mobile",
        price: 20000
    }
];

// GET ALL
app.get("/products", (req, res) => {
    const { minPrice } = req.query;

    if (minPrice !== undefined) {
        const filteredProducts = products.filter(
            product => product.price >= Number(minPrice)
        );

        return res.json(filteredProducts);
    }

    res.json(products);
});

// GET BY ID
app.get("/products/:id", (req, res) => {
    const id = Number(req.params.id);
    const product = products.find(product => product.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    res.json(product);
});

// ADD PRODUCT
app.post("/products", (req, res) => {
    const { name, price } = req.body;

    const newProduct = {
        id: products.length + 1,
        name,
        price,
    };

    products.push(newProduct);

    res.status(201).json(newProduct);
});

// UPDATE PRODUCT
app.patch("/products/:id", (req, res) => {
    const id = Number(req.params.id);
    const product = products.find(product => product.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    if (req.body.name !== undefined) {
        product.name = req.body.name;
    }

    if (req.body.price !== undefined) {
        product.price = req.body.price;
    }

    res.json(product);
});

// DELETE PRODUCT
app.delete("/products/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = products.findIndex(product => product.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    products.splice(index, 1);
    res.status(204).send();
});

export default app;
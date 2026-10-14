export const authMiddleware = (req, res, next) => {
    const authHeaders = req.headers.authorization;

    if (!authHeaders) {
        return res.status(401).json({
            message: "Authentication required"
        });
    }

    req.user = {
        id: 101,
        role: "admin"
    };

    next();
};

export const adminOnly = (req, res, next) => {

    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "Access denied"
        });
    }

    next();
};

export const validateUser = (req, res, next) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            message: "Name and email are required"
        });
    }

    next();
};
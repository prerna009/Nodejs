import jwt from "jsonwebtoken";

function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Authentication token is required"
        });
    }

    const token = authHeader.slice("Bearer ".length);

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET,
            { algorithms: ["HS256"] }
        );

        req.user = {
            id: decoded.sub,
            role: decoded.role
        };

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}

export default authenticate;
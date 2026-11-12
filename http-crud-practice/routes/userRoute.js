import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from "../controllers/userController.js";
import sendResponse from "../utils/response.js";

const userRoutes = (req, res) => {
    const { method, url } = req;
    
    const userRoute = url.match(/^\/users\/(\d+)$/);

    if (method === "GET" && url === "/users") {
        return getAllUsers(req, res);
    }

    if (method === "GET" && userRoute) {
        return getUserById(req, res, Number(userRoute[1]));
    }

    if (method === "POST" && url === "/users") {
        return createUser(req, res);
    }

    if (method === "PUT" && userRoute) {
        return updateUser(req, res, Number(userRoute[1]));
    }

    if (method === "DELETE" && userRoute) {
        return deleteUser(req, res, Number(userRoute[1]));
    }

    sendResponse(res, 400, {
        message: "Route not found"
    });
};

export default userRoutes;
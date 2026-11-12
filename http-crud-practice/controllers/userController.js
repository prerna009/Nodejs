import sendResponse from "../utils/response.js";
import users from "../data/user.js";

let nextId = 4;

export const getAllUsers = (req, res) => {
    sendResponse(res, 200, {
        message: "Users fetched successfully",
        data: users,
    });
};

export const getUserById = (req, res, id) => {
    const user = users.find(u => u.id === id);

    if (!user) {
        return sendResponse(res, 404, {
            message: "User not found"
        });
    }

    sendResponse(res, 200, {
        message: "User fetched successfully",
        data: user,
    });
};

const getRequestBody = (req) => {
    return new Promise((resolve, reject) => {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {
            try {
                resolve(JSON.parse(body));
            } catch (error) {
                reject(error);
            }
        });

        req.on("error", reject);
    });
};

export const createUser = async (req, res) => {
    const body = await getRequestBody(req);

    if (!body.name || !body.email || body.age === undefined || !Number.isFinite(body.age)) {
        return sendResponse(res, 400, {
            message: "Name, email and valid age are required"
        });
    }

    const newUser = {
        id: nextId,
        name: body.name,
        email: body.email,
        age: Number(body.age),
    }

    users.push(newUser);

    sendResponse(res, 201, {
        message: "User created successfully",
        data: newUser
    });
};

export const updateUser = async (req, res, id) => {
    try {
        const index = users.findIndex(u => u.id === id);

        if (index === -1) {
            return sendResponse(res, 404, {
                message: "user not found"
            });
        }

        const body = await getRequestBody(req);

        if (!body.name || !body.email || body.age === undefined || !Number.isFinite(body.age)) {
            return sendResponse(res, 400, {
                message: "Name, email and valid age are required"
            });
        }

        users[index] = {
            id,
            name: body.name,
            email: body.email,
            age: Number(body.age),
        }

        sendResponse(res, 200, {
            message: "User updated successfully",
            data: users[index]
        });
    } catch (error) {
        sendResponse(res, 400, {
            message: "Invalid JSON request body"
        });
    }
};

export const deleteUser = (req, res, id) => {
    const index = users.findIndex(u => u.id === id);

    if (index === -1) {
        return sendResponse(res, 404, {
            message: "user not found"
        });
    }

    const deletedUser = users.splice(index, 1)[0];

    sendResponse(res, 200, {
        message: "User deleted successfully",
        data: deletedUser
    });
};
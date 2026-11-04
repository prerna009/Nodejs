export const checkPermission = (requiredPermission) => {
    return (req, res, next) => {
        const userPermissions = req.user?.permissions || [];

        if (!userPermissions.includes(requiredPermission)) {
            return res.status(403).json({
                message: "You do not have permission to perform this action"
            });
        }

        next();
    };
};
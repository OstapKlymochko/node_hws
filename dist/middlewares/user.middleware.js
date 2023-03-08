"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const api_error_1 = require("../errors/api.error");
const User_model_1 = require("../models/User.model");
class UserMiddleware {
    async getByIdError(req, res, next) {
        try {
            const { userId } = req.params;
            const user = await User_model_1.User.findById(userId);
            if (!user) {
                throw new api_error_1.ApiError("User not found", 404);
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.userMiddleware = new UserMiddleware();

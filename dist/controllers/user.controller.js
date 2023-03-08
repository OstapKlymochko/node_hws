"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_services_1 = require("../services/user.services");
class UserController {
    async getAll(req, res, next) {
        try {
            const users = await user_services_1.userServices.getAll();
            return res.json(users);
        }
        catch (e) {
            next(e);
        }
    }
    async getById(req, res, next) {
        try {
            const { userId } = req.params;
            const user = await user_services_1.userServices.getById(userId);
            return res.json(user);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.userController = new UserController();

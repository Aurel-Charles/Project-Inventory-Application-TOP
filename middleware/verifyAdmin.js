import { HttpError } from "../error/httpError.js";

export function verifyAdmin(req, res, next) {
    try {
        const password = process.env.ADMIN_PASSWORD
        const inputPassword = req.body.adminPassword
        if (password !== inputPassword) {
            throw new HttpError("Unauthorized", 401);
        }
        next()
    } catch (error) {   
        next(error)
    }
}
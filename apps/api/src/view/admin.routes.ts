import { Router, type Request, type Response } from "express";
import { env } from "../config/env.ts";
import { apiMiddleware } from "../infrastructure/middleware/key.ts";

const adminRouter = Router();

adminRouter.post("/login", (req: Request, res: Response) => {
    try {
        const body = req.body || {};
        const password = typeof body.password === "string" ? body.password.trim() : "";
        const cleanPassword = password.replace(/^["']|["']$/g, "").trim();
        const validPasswords = [
            env.ADMIN_PASSWORD ? env.ADMIN_PASSWORD.trim() : ""
        ].filter(p => p.length > 0);

        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Por favor ingresa una contraseña."
            });
        }

        const isMatch = validPasswords.includes(password) || validPasswords.includes(cleanPassword);

        if (isMatch) {
            return res.status(200).json({
                success: true,
                token: env.API_KEY || env.ADMIN_PASSWORD || "some-api-key"
            });
        } else {
            return res.status(401).json({
                success: false,
                message: "Contraseña incorrecta."
            });
        }
    } catch (error) {
        console.error("Error en admin login:", error);
        return res.status(500).json({
            success: false,
            message: "Error interno al procesar el inicio de sesión."
        });
    }
});

adminRouter.get("/verify", apiMiddleware, (_req: Request, res: Response) => {
    res.status(200).json({ success: true, message: "Sesión válida" });
});

export default adminRouter;

import { Router, type Request, type Response } from "express";
import { env } from "../config/env.ts";

const adminRouter = Router();

adminRouter.post("/login", (req: Request, res: Response) => {
    try {
        const body = req.body || {};
        const password = typeof body.password === "string" ? body.password.trim() : "";
        const adminPassword = (env.ADMIN_PASSWORD || env.API_KEY || "admin123").trim();

        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Por favor ingresa una contraseña."
            });
        }

        if (password === adminPassword) {
            return res.status(200).json({ 
                success: true, 
                token: env.API_KEY || "some-api-key"
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

export default adminRouter;

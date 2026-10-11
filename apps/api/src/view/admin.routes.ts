import { Router, Request, Response } from "express";
import { env } from "../config/env.ts";

const adminRouter = Router();

adminRouter.post("/login", (req: Request, res: Response) => {
    const { password } = req.body;
    const adminPassword = env.ADMIN_PASSWORD || env.API_KEY || "admin123";
    
    if (password === adminPassword) {
        // Return the API key as the authorization token
        return res.status(200).json({ 
            success: true, 
            token: env.API_KEY || "some-api-key"
        });
    } else {
        return res.status(401).json({ 
            success: false, 
            message: "Contraseña incorrecta" 
        });
    }
});

export default adminRouter;

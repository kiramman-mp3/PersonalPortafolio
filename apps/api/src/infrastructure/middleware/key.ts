import type { NextFunction, Request, Response } from "express";
import { env } from "../../config/env.ts";

function normalizeKey(value: string | string[] | undefined): string {
    if (value == null) return "";
    const raw = Array.isArray(value) ? value[0] : value;
    return typeof raw === "string" ? raw.trim() : "";
}

export const apiMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const serverKey = env["API_KEY"];
    const adminPassword = env["ADMIN_PASSWORD"];

    const validKeys = [
        typeof serverKey === "string" ? serverKey.trim() : "",
        typeof adminPassword === "string" ? adminPassword.trim() : ""
    ].filter(k => k.length > 0);

    if (validKeys.length === 0) {
        return res.status(503).json({
            message: "API Key no configurada en el servidor. Configura la variable API_KEY en las variables de entorno.",
        });
    }

    let clientKey = normalizeKey(req.headers["x-api-key"]);
    if (!clientKey && req.headers["authorization"]) {
        const auth = normalizeKey(req.headers["authorization"]);
        clientKey = auth.startsWith("Bearer ") ? auth.slice(7).trim() : auth;
    }

    if (!clientKey || !validKeys.includes(clientKey)) {
        return res.status(401).json({ message: "API Key inválida o no enviada." });
    }
    next();
};
adminRouter.post("/login", (req: Request, res: Response) => {
    try {
        const body = req.body || {};
        const password =
            typeof body.password === "string" ? body.password.trim() : "";

        const cleanPassword = password.replace(/^["']|["']$/g, "").trim();
        const adminPassword = (env.ADMIN_PASSWORD || "").trim();

        // Verificar la configuración del servidor
        if (!adminPassword || !env.API_KEY) {
            console.error("ADMIN_PASSWORD o API_KEY no están configuradas.");
            return res.status(500).json({
                success: false,
                message: "El panel de administración no está configurado."
            });
        }

        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Por favor ingresa una contraseña."
            });
        }

        // Validar la contraseña
        if (password === adminPassword || cleanPassword === adminPassword) {
            return res.status(200).json({
                success: true,
                token: env.API_KEY
            });
        }

        return res.status(401).json({
            success: false,
            message: "Contraseña incorrecta."
        });
    } catch (error) {
        console.error("Error en admin login:", error);
        return res.status(500).json({
            success: false,
            message: "Error interno al procesar el inicio de sesión."
        });
    }
});
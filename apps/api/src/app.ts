import express, { type Request, type Response } from "express";
import cors from "cors";
import serviceRoutes from "./view/service.routes.ts";
import projectRoutes from "./view/project.routes.ts";
import contactRoutes from "./view/contact.routes.ts";
import adminRoutes from "./view/admin.routes.ts";

const app = express();

// Configuración de CORS para desarrollo y producción en Vercel
app.use(cors({
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-api-key"]
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Health check para Vercel y monitoreo
app.get(["/health", "/api/health"], (_req: Request, res: Response) => {
  res.status(200).json({ ok: true, message: "ok", timestamp: new Date().toISOString() });
});

// Rutas bajo prefijo /api (estándar para REST API en producción y monorepo)
app.use("/api/services", serviceRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);

// Rutas directas (compatibilidad con clientes existentes o despliegues raíz)
app.use("/services", serviceRoutes);
app.use("/projects", projectRoutes);
app.use("/contact", contactRoutes);
app.use("/admin", adminRoutes);

// Estado de la API
app.get(["/", "/api"], (_req: Request, res: Response) => {
  res.status(200).json({
    name: "JohanDev Portfolio API",
    status: "running",
    environment: process.env.NODE_ENV || "production"
  });
});

export default app;

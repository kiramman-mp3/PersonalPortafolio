import express, { Request, Response } from "express"
import cors from "cors";
import serviceRoutes from "./view/service.routes.ts"
import projectRoutes from "./view/project.routes.ts"
import contactRoutes from "./view/contact.routes.ts"
import adminRoutes from "./view/admin.routes.ts"
import { env } from "./config/env.ts"

const app = express()

app.use(cors())
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ limit: "10mb", extended: true }))

// Health check ligero (para pings de keep-alive y Render)
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ ok: true, message: "ok" })
})

app.use("/services", serviceRoutes)
app.use("/projects", projectRoutes)
app.use("/contact", contactRoutes)
app.use("/admin", adminRoutes)
app.use("/", (req: Request, res: Response) => { res.send({ message: `App running` }) })
const PORT = env["PORT"]
app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`)
})
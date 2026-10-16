import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Cargar .env tanto si se ejecuta desde apps/api como desde la raíz del monorepo
dotenv.config();
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
dotenv.config({ path: path.resolve(process.cwd(), "apps/api/.env") });
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const port = process.env.PORT ?? "4000";

export const env = {
    DATABASE_URL: process.env.DATABASE_URL,
    API_KEY: process.env.API_KEY,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    PORT: Number(port) || 4000
};
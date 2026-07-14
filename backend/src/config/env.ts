import 'dotenv/config'

const port = process.env.PORT ?? "4000"

export const env = {
    DATABASE_URL: process.env.DATABASE_URL,
    API_KEY: process.env.API_KEY,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    PORT: Number(port) || 4000
}
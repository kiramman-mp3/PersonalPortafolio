import app from "./app.ts";
import { env } from "./config/env.ts";

const PORT = env["PORT"] || 4000;

// En entornos serverless como Vercel (process.env.VERCEL definido), no iniciamos el listener HTTP
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
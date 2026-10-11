import app from "./app.ts";
import { env } from "./config/env.ts";

const PORT = Number(process.env.PORT) || env.PORT || 4000;
const HOST = "0.0.0.0";

// En entornos Serverless como Vercel (process.env.VERCEL definido), no se inicia el listener HTTP
if (!process.env.VERCEL) {
  const server = app.listen(PORT, HOST, () => {
    console.log(`🚀 JohanDev API running on http://${HOST}:${PORT}`);
    console.log(`🩺 Health check available at http://${HOST}:${PORT}/health`);
  });

  const handleShutdown = (signal: string) => {
    console.log(`\nRecibida señal ${signal}. Cerrando servidor de forma segura...`);
    server.close(() => {
      console.log("Servidor cerrado correctamente.");
      process.exit(0);
    });
  };

  process.on("SIGTERM", () => handleShutdown("SIGTERM"));
  process.on("SIGINT", () => handleShutdown("SIGINT"));
}

export default app;
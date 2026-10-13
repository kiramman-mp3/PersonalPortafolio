import dotenv from "dotenv";
dotenv.config({ path: "apps/api/.env" });

export default {
  schema: "apps/api/prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL
  }
};

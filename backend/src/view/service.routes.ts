import { Router } from "express";
import { ServiceController } from "../controller/service.ts";
import { apiMiddleware } from "../infrastructure/middleware/key.ts";

const serviceRouter = Router();
serviceRouter.get("/", ServiceController.getAll);
serviceRouter.get("/:id", ServiceController.getOne);
serviceRouter.post("/", apiMiddleware, ServiceController.create);
serviceRouter.put("/:id", apiMiddleware, ServiceController.update);
serviceRouter.delete("/:id", apiMiddleware, ServiceController.delete);

export default serviceRouter;

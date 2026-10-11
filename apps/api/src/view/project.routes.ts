import { Router } from "express";
import { ProjectController } from "../controller/project.ts";
import { apiMiddleware } from "../infrastructure/middleware/key.ts";

const projectRouter = Router();
projectRouter.get("/", ProjectController.getAll);
projectRouter.get("/:id", ProjectController.getOne);
projectRouter.post("/", apiMiddleware, ProjectController.create);
projectRouter.put("/:id", apiMiddleware, ProjectController.update);
projectRouter.delete("/:id", apiMiddleware, ProjectController.delete);

export default projectRouter;

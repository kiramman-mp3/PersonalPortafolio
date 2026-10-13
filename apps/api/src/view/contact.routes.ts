import { Router } from "express";
import { ContactController } from "../controller/contact.ts";
import { apiMiddleware } from "../infrastructure/middleware/key.ts";

const contactRouter = Router();

contactRouter.get("/", apiMiddleware, ContactController.getAll);
contactRouter.post("/", ContactController.create);
contactRouter.delete("/:id", apiMiddleware, ContactController.delete);

export default contactRouter;

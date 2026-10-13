import { Router } from "express";
import { CertificateController } from "../controller/certificate.ts";
import { apiMiddleware } from "../infrastructure/middleware/key.ts";

const certificateRouter = Router();

certificateRouter.get("/", CertificateController.getAll);
certificateRouter.get("/:id", CertificateController.getOne);
certificateRouter.post("/", apiMiddleware, CertificateController.create);
certificateRouter.put("/:id", apiMiddleware, CertificateController.update);
certificateRouter.delete("/:id", apiMiddleware, CertificateController.delete);

export default certificateRouter;

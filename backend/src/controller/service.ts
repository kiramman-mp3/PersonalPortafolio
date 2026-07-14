import { Request, Response } from "express";
import { ServicesService } from "../services/service.ts";

export class ServiceController {
    static async getAll(req: Request, res: Response) {
        try {
            const services = await ServicesService.getServices();
            res.status(200).json(services);
        } catch (error) {
            res.status(500).json({
                message: "Failed to fetch services",
                error: error instanceof Error ? error.message : "Unknown error"
            });
        }
    }

    static async getOne(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const service = await ServicesService.getService(id);
            res.status(200).json(service);
        } catch (error) {
            res.status(404).json({
                message: error instanceof Error ? error.message : "Service not found"
            });
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const service = await ServicesService.createService(req.body);
            res.status(201).json(service);
        } catch (error) {
            res.status(400).json({
                message: "Failed to create service",
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const service = await ServicesService.updateService(id, req.body);
            res.status(200).json(service);
        } catch (error) {
            res.status(400).json({
                message: "Failed to update service",
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const id = req.params.id;
            await ServicesService.deleteService(id);
            res.status(200).json({ message: "Service deleted successfully" });
        } catch (error) {
            res.status(404).json({
                message: error instanceof Error ? error.message : "Service not found",
            });
        }
    }
}

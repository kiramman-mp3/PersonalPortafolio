import { Request, Response } from "express";
import { ProjectsService } from "../services/project.ts";

export class ProjectController {
    static async getAll(req: Request, res: Response) {
        try {
            const projects = await ProjectsService.getProjects();
            res.status(200).json(projects);
        } catch (error) {
            res.status(500).json({
                message: "Failed to fetch projects",
                error: error instanceof Error ? error.message : "Unknown error"
            });
        }
    }

    static async getOne(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: "Invalid project ID" });
            }
            const project = await ProjectsService.getProject(id);
            res.status(200).json(project);
        } catch (error) {
            res.status(404).json({
                message: error instanceof Error ? error.message : "Project not found"
            });
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const project = await ProjectsService.createProject(req.body);
            res.status(201).json(project);
        } catch (error) {
            res.status(400).json({
                message: "Failed to create project",
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: "Invalid project ID" });
            }
            const project = await ProjectsService.updateProject(id, req.body);
            res.status(200).json(project);
        } catch (error) {
            res.status(400).json({
                message: "Failed to update project",
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: "Invalid project ID" });
            }
            await ProjectsService.deleteProject(id);
            res.status(200).json({ message: "Project deleted successfully" });
        } catch (error) {
            res.status(404).json({
                message: error instanceof Error ? error.message : "Project not found",
            });
        }
    }
}

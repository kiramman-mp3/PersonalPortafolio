import { ProjectSchema } from "../infrastructure/validators/project.ts";
import { ProjectModel } from "../model/project.ts";

interface ProjectCreateData {
    title: string;
    description: string;
    technologies: string[];
    status: 'completado' | 'en-progreso' | 'planificado';
    image: string;
    githubUrl?: string;
    webUrl?: string;
    backendUrl?: string;
    apkUrl?: string;
}

interface ProjectEditData {
    title?: string;
    description?: string;
    technologies?: string[];
    status?: 'completado' | 'en-progreso' | 'planificado';
    image?: string;
    githubUrl?: string;
    webUrl?: string;
    backendUrl?: string;
    apkUrl?: string;
}

export class ProjectsService {
    static async getProjects() {
        return ProjectModel.findAll();
    }

    static async getProject(id: number) {
        const project = await ProjectModel.findById(id);
        if (!project) {
            throw new Error("Project not found");
        }
        return project;
    }

    static async createProject(data: ProjectCreateData) {
        const validated = ProjectSchema.parse(data);
        return ProjectModel.create(validated);
    }

    static async updateProject(id: number, newData: ProjectEditData) {
        const existing = await ProjectModel.findById(id);
        if (!existing) {
            throw new Error("Project not found");
        }
        const validated = ProjectSchema.partial().parse(newData);
        return ProjectModel.update(id, validated);
    }

    static async deleteProject(id: number) {
        const existing = await ProjectModel.findById(id);
        if (!existing) {
            throw new Error("Project not found");
        }
        return ProjectModel.delete(id);
    }
}

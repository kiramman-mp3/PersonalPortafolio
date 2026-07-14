import { z } from "zod";

export const ProjectSchema = z.object({
    title: z.string().min(1, "Title is required").max(100),
    shortDescription: z.string().min(1, "Short description is required").max(255),
    description: z.string().min(1, "Description is required"),
    technologies: z.array(z.string().min(1).max(255)),
    status: z.enum(['completado', 'en-progreso', 'planificado']),
    image: z.string().min(1),
    githubUrl: z.string().max(255).optional().or(z.literal('')),
    webUrl: z.string().max(255).optional().or(z.literal('')),
    backendUrl: z.string().max(255).optional().or(z.literal('')),
    apkUrl: z.string().max(255).optional().or(z.literal('')),
});

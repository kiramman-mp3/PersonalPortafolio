import { z } from "zod";

export const ProjectSchema = z.object({
    title: z.string().min(1, "Title is required").max(100),
    description: z.string().min(1, "Description is required"),
    technologies: z.array(z.string().min(1).max(255)),
    status: z.enum(['completado', 'en-progreso', 'planificado']),
    image: z.string().min(1).max(255),
    githubUrl: z.string().url("Github URL must be valid").max(255),
});

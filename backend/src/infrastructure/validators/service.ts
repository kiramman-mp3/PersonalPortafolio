import { z } from "zod";

export const ServiceSchema = z.object({
    title: z.string().min(1, "Title is required").max(100),
    description: z.string().min(1, "Description is required"),
    imageUrl: z.string().url("Image URL must be valid").max(255),
    imageAlt: z.string().min(1, "Image Alt is required").max(100),
    extendedInfo: z.array(z.string().min(1).max(255)),
    technologies: z.array(z.string().min(1).max(255)).optional(),
});

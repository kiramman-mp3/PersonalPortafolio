import { z } from "zod";

export const ContactSchema = z.object({
    name: z.string().min(1, "El nombre es obligatorio").max(100),
    email: z.string().email("El correo electrónico no es válido").max(150),
    subject: z.string().max(150).optional().nullable(),
    message: z.string().min(1, "El mensaje es obligatorio"),
});

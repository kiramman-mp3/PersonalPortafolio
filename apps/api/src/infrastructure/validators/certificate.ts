import { z } from "zod";

export const CertificateSchema = z.object({
  title: z.string().min(1, "El título es obligatorio").max(150),
  issuer: z.string().min(1, "La institución emisora es obligatoria").max(100),
  issuerIcon: z.string().max(50).default("fas fa-certificate").optional(),
  date: z.string().min(1, "La fecha o año es obligatorio").max(50),
  category: z.string().min(1).max(50),
  credentialId: z.string().min(1, "El ID de credencial es obligatorio").max(100),
  credentialUrl: z.string().nullish().or(z.literal('')),
  description: z.string().min(1, "La descripción es obligatoria"),
  skills: z.array(z.string().min(1).max(255)),
  hours: z.number().int().nonnegative().default(0).optional(),
  image: z.string().nullish().or(z.literal(''))
});

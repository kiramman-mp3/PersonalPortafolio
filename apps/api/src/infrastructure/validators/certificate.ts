import { z } from "zod";

export const CertificateSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "El título del certificado es obligatorio").max(150),
  issuer: z.string().nullish().transform(val => val?.trim() || "Institución emisora"),
  issuerIcon: z.string().nullish().transform(val => val?.trim() || "fas fa-certificate"),
  date: z.string().nullish().transform(val => val?.trim() || new Date().getFullYear().toString()),
  category: z.string().nullish().transform(val => val?.trim() || "web"),
  credentialId: z.string().nullish().transform(val => val?.trim() || "Sin ID"),
  credentialUrl: z.string().nullish().transform(val => val?.trim() || null),
  description: z.string().nullish().transform(val => val?.trim() || ""),
  skills: z.array(z.string()).nullish().transform(val => val || []),
  hours: z.coerce.number().int().nonnegative().nullish().transform(val => val ?? 0),
  image: z.string().nullish().transform(val => val?.trim() || null),
  expirationDate: z.string().nullish().transform(val => val?.trim() || null),
  badgeStatus: z.string().nullish().transform(val => val?.trim() || null)
});

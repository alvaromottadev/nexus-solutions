import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "O nome do produto é obrigatório."),
  description: z.string().optional(),
  code: z.string().optional(),
  image: z.instanceof(File).optional().nullable().or(z.string().nullable()),
});

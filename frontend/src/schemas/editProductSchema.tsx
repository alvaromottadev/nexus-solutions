import { z } from "zod";

const editProductSchema = z.object({
  name: z.string().min(1, {
    message: "O nome do produto é obrigatório.",
  }),
  description: z.string().optional(),
  code: z.string().optional(),
  image: z.instanceof(File).optional().nullable().or(z.string().nullable()),
});

export default editProductSchema;

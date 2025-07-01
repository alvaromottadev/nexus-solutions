import { z } from "zod";

export const editEmployeeFormSchema = z.object({
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  password: z.string().optional(),
  name: z.string().min(1, "Nome é obrigatório"),
  role: z.enum(["MANAGER", "OPERATOR", "VIEWER"]),
  image: z.instanceof(File).optional(),
});

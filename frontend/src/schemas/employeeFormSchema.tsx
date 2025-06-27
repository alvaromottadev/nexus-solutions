import { z } from "zod";

export const employeeFormSchema = z.object({
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  name: z.string().min(1, "Nome é obrigatório"),
  role: z.enum(["MANAGER", "OPERATOR", "VIEWER"]),
  image: z.instanceof(File).optional(),
});

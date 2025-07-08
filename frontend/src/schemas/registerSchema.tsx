import { z } from "zod";

const registerSchema = z.object({
  name: z
    .string({ message: "Nome é obrigatório" })
    .min(1, "Nome é obrigatório"),
  email: z
    .string({ message: "Email é obrigatório" })
    .email("Email inválido")
    .min(1, "Email é obrigatório"),
  cnpj: z
    .string({ message: "CNPJ é obrigatório" })
    .min(14, "CNPJ deve ter pelo menos 14 caracteres")
    .max(14, "CNPJ deve ter no máximo 14 caracteres"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string().min(6, "Confirmação de senha é obrigatória"),
});

export default registerSchema;

import { z } from "zod";

const changePasswordSchema = z.object({
  oldPassword: z.string().min(6, {
    message: "A senha antiga deve ter pelo menos 6 caracteres.",
  }),
  newPassword: z.string().min(6, {
    message: "A nova senha deve ter pelo menos 6 caracteres.",
  }),
  confirmPassword: z.string().min(6, {
    message: "A confirmação da nova senha deve ter pelo menos 6 caracteres.",
  }),
});

export default changePasswordSchema;

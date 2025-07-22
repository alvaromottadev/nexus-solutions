import { z } from "zod";

const resetPasswordSchema = z.object({
  resetCode: z.string().min(6).max(6),
  password: z.string().min(6).max(100),
  confirmPassword: z.string().min(6).max(100),
});

export default resetPasswordSchema;

import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().email().min(1).max(100),
});

export default forgotPasswordSchema;

import { z } from "zod";

const addressFormSchema = z.object({
  street: z.string().min(1, "A rua é obrigatória."),
  number: z.string().min(1, "O número é obrigatório."),
  complement: z.string().optional(),
  district: z.string().min(1, "O bairro é obrigatório."),
  city: z.string().min(1, "A cidade é obrigatória."),
  state: z.string().min(1, "O estado é obrigatório."),
  postalCode: z.string().min(1, "O CEP é obrigatório."),
  country: z.string().min(1, "O país é obrigatório."),
});

export default addressFormSchema;

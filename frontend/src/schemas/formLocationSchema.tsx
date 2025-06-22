import { z } from "zod";

const formLocationSchema = z.object({
  name: z.string().min(1, "O nome do almoxarifado é obrigatório."),
  street: z.string().min(1, "A rua é obrigatória."),
  number: z.string().min(1, "O número é obrigatório."),
  complement: z.string().optional(),
  district: z.string().min(1, "O bairro é obrigatório."),
  city: z.string().min(1, "A cidade é obrigatória."),
  state: z.string().min(1, "O estado é obrigatório."),
  postalCode: z.string().min(1, "O CEP é obrigatório."),
  country: z.string().min(1, "O país é obrigatório."),
});

export default formLocationSchema;

import { z } from "zod";

const formInventorySchema = z.object({
  quantity: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "A quantidade deve ser um número positivo.")
  ),
  minStock: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "O estoque mínimo deve ser um número positivo.")
  ),
});

export default formInventorySchema;

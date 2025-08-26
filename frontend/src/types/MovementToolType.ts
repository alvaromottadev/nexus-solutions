import type { ProductType } from "./ProductType";

export interface MovementToolType {
  id: string;
  status: "ENTRY" | "EXIT";
  movementedAt: string;
  product: ProductType;
}

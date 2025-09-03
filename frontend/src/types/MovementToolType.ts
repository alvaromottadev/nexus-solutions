import type { ProductType } from "./ProductType";

export interface MovementToolType {
  id: string;
  status: "IN" | "OUT";
  movementedAt: string;
  product: ProductType;
}

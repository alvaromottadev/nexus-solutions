import type { ProductType } from "./ProductType";

export interface MovementType {
  id: string;
  type: "IN" | "OUT";
  description: string | null;
  movementDate: string;
  performedBy: {
    id: string;
    name: string;
  };
  location: string;
  items: [
    {
      id: string;
      product: ProductType;
      quantity: number;
    }
  ];
}

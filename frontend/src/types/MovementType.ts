import type { ProductType } from "./ProductType";

export interface MovementType {
  id: string;
  type: "IN" | "OUT";
  description: string | null;
  date: string;
  performedBy: {
    id: string;
    name: string;
  };
  items: [
    {
      id: string;
      product: ProductType;
      quantity: number;
    }
  ];
}

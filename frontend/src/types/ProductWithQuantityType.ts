import type { ProductType } from "./ProductType";

export default interface ProductWithQuantityType {
  product: ProductType;
  quantity: number;
}

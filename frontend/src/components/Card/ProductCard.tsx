import type { ProductType } from "@/types/ProductType";
import CustomText from "../CustomText";
import EditProductDialog from "../Dialog/EditProduct";
import { useState } from "react";

interface ProductCardProps {
  product: ProductType;
  products: ProductType[];
  setProducts: (products: ProductType[]) => void;
}

export default function ProductCard({
  product,
  products,
  setProducts,
}: ProductCardProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <div className="flex items-center justify-around mt-[1rem] w-[90%] min-h-[7rem] bg-[#f9f9f9] border-black border-[1px] rounded-[0.5rem]">
        <img src={product.image} className="w-[5rem] h-[5rem] object-cover" />
        <div className="flex flex-col w-[50%]">
          <CustomText className="text-[var(--primary-color)] font-bold">
            {product.name}
          </CustomText>
          <CustomText>{product.description}</CustomText>
        </div>
        <EditProductDialog
          isOpen={open}
          setOpen={setOpen}
          product={product}
          products={products}
          setProducts={setProducts}
        />
      </div>
    </>
  );
}

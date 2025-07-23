import type { ProductType } from "@/types/ProductType";
import CustomText from "../CustomText";
import EditProductDialog from "../Dialog/Product/EditProduct";
import { useState } from "react";
import usePermission from "@/hooks/usePermission";
import { ImageIcon } from "lucide-react";

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

  const hasPermission = usePermission();

  return (
    <>
      <div className="flex items-center justify-around mt-[1rem] w-[90%] min-h-[7rem] overflow-hidden bg-[#f9f9f9] border-black border-[1px] rounded-[0.5rem] hover:translate-y-[-5px] duration-300 shadow-md">
        {product.image ? (
          <img src={product.image} className="w-[5rem] h-[5rem] object-cover" />
        ) : (
          <ImageIcon size={80} color="#322866" />
        )}
        <div className="flex flex-col w-[50%]">
          <CustomText className="text-[var(--primary-color)] font-bold">
            {product.name}
          </CustomText>
          <CustomText className="">{product.description}</CustomText>
        </div>
        {hasPermission && (
          <EditProductDialog
            isOpen={open}
            setOpen={setOpen}
            product={product}
            products={products}
            setProducts={setProducts}
          />
        )}
      </div>
    </>
  );
}

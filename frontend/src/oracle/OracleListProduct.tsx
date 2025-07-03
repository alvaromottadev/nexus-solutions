import CustomText from "@/components/CustomText";
import type { ProductType } from "@/types/ProductType";

interface OracleListProductProps {
  header: string;
  content: ProductType[];
}

export default function OracleListProduct({
  header,
  content,
}: OracleListProductProps) {
  return (
    <>
      <div className="flex flex-col text-white font-poppins">
        <CustomText>{header}</CustomText>
        {content.map((product, index) => (
          <CustomText key={index}>📦 Produto: {product.name}</CustomText>
        ))}
      </div>
    </>
  );
}

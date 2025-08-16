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
    <div className="flex flex-col text-white font-poppins">
      {header && (
        <h3 className="text-lg font-semibold text-purple-200 mb-3">
          {header}
        </h3>
      )}
      <div className="space-y-2">
        {content.map((product, index) => (
          <div 
            key={index} 
            className="bg-white/5 rounded-lg p-3 border border-white/10 hover:bg-white/10 transition-colors duration-200"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span className="font-medium text-purple-200">📦 {product.name}</span>
            </div>
            {product.description && (
              <p className="text-xs text-gray-300 mt-1 ml-4">
                {product.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

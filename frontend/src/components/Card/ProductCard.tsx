import type { ProductType } from "@/types/ProductType";
import EditProductDialog from "../Dialog/Product/EditProduct";
import { useState } from "react";
import usePermission from "@/hooks/usePermission";
import { ImageIcon, QrCode, Calendar, Code } from "lucide-react";

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="p-6 pb-4">
        <div className="flex items-start space-x-4">
          <div className="relative">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="max-w-[5rem] max-h-[7rem] object-cover rounded-lg border-2 border-gray-100 group-hover:border-[var(--primary-color)] transition-colors duration-300"
              />
            ) : (
              <div className="w-20 h-20 bg-gray-100 rounded-lg border-2 border-gray-200 flex items-center justify-center group-hover:border-[var(--primary-color)] transition-colors duration-300">
                <ImageIcon size={32} className="text-gray-400" />
              </div>
            )}
            {product.qrCode && (
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-400 border-2 border-white rounded-full flex items-center justify-center">
                <QrCode size={12} className="text-white" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-[var(--primary-color)] transition-colors duration-300 mb-2">
              {product.name}
            </h3>
            <div className="flex items-center space-x-2 mb-3">
              <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                <Code className="w-3 h-3 mr-1" />
                {product.code}
              </div>
              {product.qrCode && (
                <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                  <QrCode className="w-3 h-3 mr-1" />
                  QR Code
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {product.description && (
        <div className="px-6 pb-4">
          <p className="text-sm text-gray-600 leading-relaxed">
            {truncateText(product.description, 120)}
          </p>
        </div>
      )}

      <div className="px-6 pb-4">
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
            <span>Criado em {formatDate(product.createdAt)}</span>
          </div>

          {product.updatedAt && (
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-2 text-gray-400" />
              <span>Atualizado em {formatDate(product.updatedAt)}</span>
            </div>
          )}
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            ID: {product.id.slice(0, 8)}...
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
      </div>
    </div>
  );
}

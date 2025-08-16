import api from "@/client/api-client";
import { ChartColumn } from "lucide-react";
import { useEffect, useState } from "react";

export default function GraphicComponent() {
  const [chartData, setChartData] = useState<
    { productName: string; quantity: number }[]
  >([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    setLoading(true);
    api
      .get(`/reports/most-traded-products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const data = res.data.map(
          (item: { productName: string; quantity: number }) => ({
            productName: item.productName,
            quantity: item.quantity,
          })
        );
        setChartData(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [token]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="p-4 bg-[var(--primary-color)]/10 rounded-full mb-4">
          <div className="w-12 h-12 border-4 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-[var(--primary-color)] font-medium">
          Carregando dados...
        </p>
      </div>
    );
  }

  if (chartData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="p-4 bg-[var(--primary-color)]/10 rounded-full mb-4">
          <ChartColumn size={48} className="text-[var(--primary-color)]" />
        </div>
        <p className="text-[var(--primary-color)] font-medium">
          Nenhuma movimentação registrada ainda
        </p>
        <p className="text-gray-500 text-sm mt-1">
          Os dados aparecerão aqui quando houver movimentações
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="space-y-4">
        {chartData.slice(0, 5).map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-[var(--primary-color)] rounded-full"></div>
                <span className="font-medium text-gray-800">
                  {item.productName}
                </span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-[var(--primary-color)]">
                  {item.quantity}
                </span>
                <p className="text-xs text-gray-500">movimentações</p>
              </div>
            </div>

            <div className="mt-3 w-full bg-gray-100 rounded-full h-2">
              <div
                className="bg-[var(--primary-color)] h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(
                    (item.quantity /
                      Math.max(...chartData.map((d) => d.quantity))) *
                      100,
                    100
                  )}%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {chartData.length > 5 && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            +{chartData.length - 5} outros produtos
          </p>
        </div>
      )}
    </div>
  );
}

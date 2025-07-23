import api from "@/client/api-client";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { ChartColumn } from "lucide-react";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import CustomText from "./CustomText";

export default function GraphicComponent() {
  const [chartData, setChartData] = useState<
    { month: string; quantity: number }[]
  >([]);

  const token = localStorage.getItem("token");

  const chartConfig = {
    quantity: {
      label: "Quantidade",
      color: "#2563eb",
    },
  } satisfies ChartConfig;

  useEffect(() => {
    api
      .get(`/reports/most-traded-products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const data = res.data.map(
          (item: { productName: string; quantity: number }) => ({
            month: item.productName,
            quantity: item.quantity,
          })
        );
        setChartData(data);
      });
  }, []);

  return (
    <>
      <CustomText>
        {chartData.length > 0
          ? "Produtos mais movimentados"
          : "Nenhuma movimentação registrada"}
      </CustomText>

      {chartData.length > 0 ? (
        <ChartContainer
          config={chartConfig}
          className="min-h-[25rem] w-[25rem] xl:min-h-[30rem] xl:w-[35rem] bg-white"
        >
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="quantity" fill="var(--primary-color)" radius={4} />
          </BarChart>
        </ChartContainer>
      ) : (
        <ChartColumn size={400} color="var(--primary-color)" />
      )}
    </>
  );
}

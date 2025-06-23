import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

export default function GraphicComponent() {
  const chartData = [
    { month: "Disjuntor 10A", quantity: 186 },
    { month: "Disjuntor 16A", quantity: 120 },
    { month: "Interruptor Simples", quantity: 150 },
    { month: "Interruptor Duplo", quantity: 130 },
  ];

  const chartConfig = {
    quantity: {
      label: "Quantity",
      color: "#2563eb",
    },
  } satisfies ChartConfig;

  return (
    <>
      <ChartContainer
        config={chartConfig}
        className="min-h-[30rem] w-[35rem] bg-white"
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
    </>
  );
}

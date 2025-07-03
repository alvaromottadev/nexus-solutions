import CustomText from "@/components/CustomText";
import type { MovementType } from "@/types/MovementType";
import dateFormatter from "@/utils/DateFormatter";

interface OracleListProductProps {
  header: string;
  content: MovementType[];
}

export default function OracleListMovement({
  header,
  content,
}: OracleListProductProps) {
  return (
    <>
      <div className="text-white flex flex-col gap-y-5">
        <CustomText>{header}</CustomText>
        {content.map((movement, index) => (
          <div className="flex flex-col">
            <CustomText>🚚 Movimentação {index + 1}</CustomText>
            <CustomText>
              📌 Tipo: {movement.type === "IN" ? "Entrada" : "Saida"}
            </CustomText>
            <CustomText>
              📃 Descrição:{" "}
              {movement.description ? movement.description : "Sem descrição"}
            </CustomText>
            <CustomText>
              📅 Data da Movimentação: {dateFormatter(movement.movementDate)}
            </CustomText>
            <CustomText>
              👨‍💼 Realizada por: {movement.performedBy.name}
            </CustomText>
            <br />
            <CustomText>Items:</CustomText>
            {movement.items.map((item, index) => (
              <div key={index} className="flex flex-col">
                <CustomText>📦 Produto: {item.product.name}</CustomText>
                <CustomText>🔢 Quantidade: {item.quantity}</CustomText>
                <br />
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

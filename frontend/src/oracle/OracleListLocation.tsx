import CustomText from "@/components/CustomText";
import type { LocationType } from "@/types/LocationType";
import addressFormatter from "@/utils/AddressFormatter";

interface OracleListProductProps {
  header: string;
  content: LocationType[];
}

export default function OracleListLocation({
  header,
  content,
}: OracleListProductProps) {
  return (
    <>
      <div className="flex flex-col gap-y-2 text-white font-poppins">
        <CustomText>{header}</CustomText>
        {content.map((location, index) => (
          <div className="flex flex-col">
            <CustomText key={index}>
              🏛️ Almoxarifado: {location.name}
            </CustomText>
            <CustomText>
              📍 Endereço: {addressFormatter(location.address)}
            </CustomText>
          </div>
        ))}
      </div>
    </>
  );
}

import { Edit } from "lucide-react";
import CustomText from "../CustomText";

interface LocationCardProps {
  name: string;
  address: {
    street: string;
    number: string;
    district: string;
    city: string;
    state: string;
    country: string;
  };
}

export default function LocationCard({ name, address }: LocationCardProps) {
  const addressText = `${address.street}, ${address.number}, ${address.district}, ${address.city} - ${address.state}, ${address.country}`;

  return (
    <>
      <div className="p-5 flex items-center justify-between mt-[1rem] bg-[#f9f9f9] min-h-[4rem] w-full border-[1px] rounded-[0.5rem] border-black">
        <div className="flex flex-col">
          <CustomText className="font-bold">{name}</CustomText>
          <CustomText className="break-words">{addressText}</CustomText>
        </div>
        <div>
          <Edit size={48} color="black" />
        </div>
      </div>
    </>
  );
}

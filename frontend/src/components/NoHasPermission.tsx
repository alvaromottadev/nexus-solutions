import { Lock } from "lucide-react";
import CustomText from "./CustomText";

export default function NoHasPermission() {
  return (
    <div className="h-full flex flex-col flex-1 gap-y-5 justify-center items-center">
      <Lock color="purple" size={96} />
      <CustomText className="text-[1.2rem] lg:text-[1.5rem]">
        Você não tem permissão para acessar essa página
      </CustomText>
    </div>
  );
}

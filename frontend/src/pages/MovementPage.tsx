import CustomText from "@/components/CustomText";
import TopBar from "@/components/TopBar";

export default function MovementPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <div className="flex justify-center">
        <CustomText className="text-[var(--primary-color)] text-[2.5rem] font-bold">
          Movimentações
        </CustomText>
      </div>
    </div>
  );
}

import type EmployeeType from "@/types/EmployeeType";
import CustomText from "../CustomText";
import defaultAvatar from "@/assets/default-avatar.jpg";

interface EmployeeCardProps {
  employee: EmployeeType;
}

export default function EmployeeCard({ employee }: EmployeeCardProps) {
  return (
    <>
      <div className="flex items-center justify-around mt-[1rem] w-[90%] min-h-[7rem] bg-[#f9f9f9] border-black border-[1px] rounded-[0.5rem] hover:translate-y-[-5px] duration-300 shadow-md">
        <img
          src={employee.avatar ? employee.avatar : defaultAvatar}
          className="w-[5rem] h-[5rem] rounded-full"
        />
        <div className="flex flex-col w-[50%]">
          <CustomText className="text-[var(--primary-color)] font-bold">
            {employee.name}
          </CustomText>
        </div>
      </div>
    </>
  );
}

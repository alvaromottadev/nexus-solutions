import CustomText from "@/components/CustomText";
import type EmployeeType from "@/types/EmployeeType";

interface OracleListEmployeeProps {
  header: string;
  content: EmployeeType[];
}

export default function OracleListEmployee({
  header,
  content,
}: OracleListEmployeeProps) {
  return (
    <>
      <div className="text-white flex flex-col gap-y-5">
        <CustomText>{header}</CustomText>
        {content.map((employee, index) => {
          const role =
            employee.role === "VIEWER"
              ? "Visualizador"
              : employee.role === "OPERATOR"
              ? "Operador"
              : "Gerente";
          return (
            <div key={index} className="flex flex-col">
              <CustomText>👨‍💼 Funcionário: {employee.name}</CustomText>
              <CustomText>📧 Email: {employee.user.email}</CustomText>
              <CustomText>🔧 Cargo: {role}</CustomText>
            </div>
          );
        })}
      </div>
    </>
  );
}

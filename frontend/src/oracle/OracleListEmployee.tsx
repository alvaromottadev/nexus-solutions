import type { EmployeeType } from "@/types/EmployeeType";

interface OracleListEmployeeProps {
  header: string;
  content: EmployeeType[];
}

export default function OracleListEmployee({
  header,
  content,
}: OracleListEmployeeProps) {
  return (
    <div className="flex flex-col text-white font-poppins">
      {header && (
        <h3 className="text-lg font-semibold text-purple-200 mb-3">
          {header}
        </h3>
      )}
      <div className="space-y-2">
        {content.map((employee, index) => (
          <div 
            key={index} 
            className="bg-white/5 rounded-lg p-3 border border-white/10 hover:bg-white/10 transition-colors duration-200"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span className="font-medium text-yellow-200">👤 {employee.name}</span>
            </div>
            <div className="mt-2 space-y-1 ml-4">
              {employee.email && (
                <p className="text-xs text-gray-300">
                  <span className="text-purple-300">Email:</span> {employee.email}
                </p>
              )}
              {employee.role && (
                <p className="text-xs text-gray-300">
                  <span className="text-purple-300">Cargo:</span> {employee.role}
                </p>
              )}
              {employee.department && (
                <p className="text-xs text-gray-300">
                  <span className="text-purple-300">Departamento:</span> {employee.department}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

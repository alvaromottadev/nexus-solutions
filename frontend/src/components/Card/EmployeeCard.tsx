import type EmployeeType from "@/types/EmployeeType";
import defaultAvatar from "@/assets/default-avatar.jpg";
import { Edit, Mail, Calendar, Shield } from "lucide-react";
import EmployeeDialog from "../Dialog/Employee/EmployeeDialog";

interface EmployeeCardProps {
  employees: EmployeeType[];
  setEmployees: (employees: EmployeeType[]) => void;
  employee: EmployeeType;
}

export default function EmployeeCard({
  employee,
  setEmployees,
  employees,
}: EmployeeCardProps) {
  const getRoleName = (role: string) => {
    const roleNames = {
      MANAGER: "Gerente",
      OPERATOR: "Operador",
      VIEWER: "Visualizador",
    };
    return roleNames[role as keyof typeof roleNames] || role;
  };

  const getRoleColor = (role: string) => {
    const roleColors = {
      MANAGER: "bg-green-100 text-green-800 border-green-200",
      OPERATOR: "bg-blue-100 text-blue-800 border-blue-200",
      VIEWER: "bg-orange-100 text-orange-800 border-orange-200",
    };
    return (
      roleColors[role as keyof typeof roleColors] ||
      "bg-gray-100 text-gray-800 border-gray-200"
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="p-6 pb-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={employee.avatar ? employee.avatar : defaultAvatar}
              alt={employee.name}
              className="w-16 h-16 rounded-full object-cover border-4 border-gray-100 group-hover:border-[var(--primary-color)] transition-colors duration-300"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-[var(--primary-color)] transition-colors duration-300">
              {employee.name}
            </h3>
            <div
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(
                employee.role
              )}`}
            >
              <Shield className="w-3 h-3 mr-1" />
              {getRoleName(employee.role)}
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pb-4">
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <Mail className="w-4 h-4 mr-3 text-gray-400" />
            <span className="truncate">{employee.user.email}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-3 text-gray-400" />
            <span>Adicionado em {formatDate(employee.createdAt)}</span>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            ID: {employee.id.slice(0, 8)}...
          </div>
          <EmployeeDialog
            employee={employee}
            setEmployees={setEmployees}
            employees={employees}
          >
            <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-[var(--primary-color)] bg-white border border-[var(--primary-color)] rounded-lg hover:bg-[var(--primary-color)] hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary-color)]">
              <Edit className="w-4 h-4 mr-2" />
              Editar
            </button>
          </EmployeeDialog>
        </div>
      </div>
    </div>
  );
}

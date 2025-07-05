import type { AuthMeType } from "@/types/AuthMeType";
import CompanyForm from "./CompanyForm";
import EmployeeForm from "./EmployeeForm";
import { useEffect, useState } from "react";
import type EmployeeType from "@/types/EmployeeType";
import api from "@/client/api-client";
import type { CompanyType } from "@/types/CompanyType";

interface FormFieldComponentProps {
  user: AuthMeType;
}

export default function ProfileForm({ user }: FormFieldComponentProps) {
  const [employee, setEmployee] = useState<EmployeeType | null>(null);
  const [company, setCompany] = useState<CompanyType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const type = user.type;

  useEffect(() => {
    if (type === "EMPLOYEE") {
      api
        .get(`/employees/me`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setEmployee(res.data);
          setIsLoading(false);
        });
      return;
    }
    api
      .get(`/companies/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setCompany(res.data);
        setIsLoading(false);
      });
  }, []);

  if (type === "EMPLOYEE" && !isLoading && employee) {
    return <EmployeeForm auth={user} employee={employee} />;
  } else if (type === "COMPANY" && !isLoading && company) {
    return <CompanyForm company={company!} />;
  }
}

export default interface EmployeeType {
  id: string;
  name: string;
  avatar: string;
  role: "OPERATOR" | "MANAGER" | "VIEWER";
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    email: string;
    type: "EMPLOYEE" | "COMPANY";
  };
}

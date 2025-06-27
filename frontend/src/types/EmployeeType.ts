export default interface EmployeeType {
  id: string;
  name: string;
  role: "OPERATOR" | "MANAGER" | "VIEWER";
  createdAt: string;
  updatedAt: string;
}

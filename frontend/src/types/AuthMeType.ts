export interface AuthMeType {
  id: string;
  name: string;
  email: string;
  type: string;
  role: string | null;
  createdAt: string;
  company: {
    id: string;
    name: string;
    address: {
      id: string;
      street: string;
      number: string;
      complement: string;
      district: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
  };
}

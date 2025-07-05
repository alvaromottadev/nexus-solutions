export interface CompanyType {
  id: string;
  name: string;
  avatar: string;
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
  user: {
    id: string;
    email: string;
    type: "COMPANY";
  };
}

export interface LocationType {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string | null;
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
}

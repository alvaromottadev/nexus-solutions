import RoleType from './RoleType';

export interface AuthMeType {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  type: string;
  role: RoleType;
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

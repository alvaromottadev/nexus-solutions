export default interface InventoryType {
  id: string;
  quantity: number;
  minStock: number;
  status: 'OUT_OF_STOCK' | 'OK' | 'LOW';
  createdAt: string;
  updatedAt: string;
  product: {
    id: string;
    name: string;
    description: string;
    image: string;
    qrCode: string;
    code: string;
    createdAt: string;
    updatedAt: string;
  };
  location: {
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
  };
}

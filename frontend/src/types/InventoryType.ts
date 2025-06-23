export default interface InventoryType {
  id: string;
  quantity: number;
  minStock: number;
  status: string;
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
}

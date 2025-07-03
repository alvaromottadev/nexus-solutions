import type AddressType from "@/types/AddressType";

export default function addressFormatter(address: AddressType) {
  return `${address.street}, ${address.number} ${
    address.complement ? `- ${address.complement}` : ""
  }, ${address.district}, ${address.city} - ${address.state}, ${
    address.postalCode
  }, ${address.country}`;
}

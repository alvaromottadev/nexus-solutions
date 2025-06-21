export interface LocationResponseType {
  content: [
    {
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
  ];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
    offset: number;
    unpaged: boolean;
    paged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

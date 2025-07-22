export interface PageableResponseType<T> {
  content: [T];
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

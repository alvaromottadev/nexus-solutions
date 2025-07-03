export interface OracleMessageType {
  status: number;
  header: string | null;
  message: {
    type: string;
    schema: string | null;
    content: any;
  };
  action: any;
  author: string;
}

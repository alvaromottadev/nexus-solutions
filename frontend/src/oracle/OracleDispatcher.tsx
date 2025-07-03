import type { OracleMessageType } from "@/types/oracle/OracleMessageType";
import OracleText from "./OracleText";
import OracleListProduct from "./OracleListProduct";
import OracleListLocation from "./OracleListLocation";
import OracleListMovement from "./OracleListMovement";
import OracleListEmployee from "./OracleListEmployee";

interface OracleDispatcherProps {
  OracleResponse: OracleMessageType;
}

export default function OracleDispatcher({
  OracleResponse,
}: OracleDispatcherProps) {
  const type = OracleResponse.message.type;
  switch (type) {
    case "text":
      return (
        <OracleText
          header={OracleResponse.header!}
          content={OracleResponse.message.content}
        />
      );
    case "list":
      const schema = OracleResponse.message.schema;
      switch (schema) {
        case "product":
          return (
            <OracleListProduct
              header={OracleResponse.header!}
              content={OracleResponse.message.content}
            />
          );
        case "location":
          return (
            <OracleListLocation
              header={OracleResponse.header!}
              content={OracleResponse.message.content}
            />
          );
        case "movement":
          return (
            <OracleListMovement
              header={OracleResponse.header!}
              content={OracleResponse.message.content}
            />
          );
        case "employee":
          return (
            <OracleListEmployee
              header={OracleResponse.header!}
              content={OracleResponse.message.content}
            />
          );
      }
  }
}

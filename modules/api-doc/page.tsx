import { createSwaggerSpec } from "next-swagger-doc";
import "swagger-ui-react/swagger-ui.css";
import ReactSwagger from "./react-swagger";

async function ApiDoc() {
  const spec: Record<string, any> = createSwaggerSpec({
    apiFolder: "app/api",
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Next Swagger API Example",
        version: "1.0",
      },
    },
  });
  return <ReactSwagger spec={spec} />;
}

export default ApiDoc;

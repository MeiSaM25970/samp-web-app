"use client";

import { ConfigProvider } from "antd";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

type Props = {
  spec: Record<string, any>;
};

function ReactSwagger({ spec }: Props) {
  return (
    <ConfigProvider direction="ltr">
      <SwaggerUI spec={spec} />
    </ConfigProvider>
  );
}

export default ReactSwagger;

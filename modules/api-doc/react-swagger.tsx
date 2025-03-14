"use client";

import styled from "styled-components";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

type Props = {
  spec: Record<string, any>;
};

function ReactSwagger({ spec }: Props) {
  return (
    <ReactSwaggerStyles>
      <SwaggerUI spec={spec} />
    </ReactSwaggerStyles>
  );
}

export default ReactSwagger;

const ReactSwaggerStyles = styled.div`
  direction: ltr !important;
  font-family: sans-serif !important;

  * {
    font-family: sans-serif !important;
  }
`;

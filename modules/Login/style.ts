"use client";

import { Row } from "antd";
import styled from "styled-components";

export const LoginContainer = styled(Row)`
  background: url(/images/loginLogo.svg);
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100vw;
  height: 100vh;

  @media only screen and (max-width: 768px) {
    background-position: left bottom;
  }
`;

"use client";
import { Row } from "antd";
import styled from "styled-components";

export const MapContainer = styled(Row)`
  padding: 16px;
  border-radius: 0 0 12px 12px;
  background: ${({ theme }) => theme.colors.background.bg3};
  /* 2 */
  box-shadow: 0px 4px 6px 0px rgba(19, 19, 19, 0.25);
`;

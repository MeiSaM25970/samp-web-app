"use client";

import { Row } from "antd";
import styled from "styled-components";

export const AllProjectsDetailsMobileContainer = styled(Row)`
  padding: 16px 12px;
  border-radius: 12px 12px 0px 0px;
  border: 1px solid ${({ theme }) => theme.colors.background.bg1};
  background: ${({ theme }) => theme.colors.background.bg3};
  gap: 8px;
`;

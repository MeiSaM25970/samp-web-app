"use client";

import { Row } from "antd";
import styled from "styled-components";

export const AllProjectsDetailsContainer = styled(Row)`
  padding: 16px 24px;
  border-radius: 12px 12px 0px 0px;
  border: 1px solid ${({ theme }) => theme.colors.background.bg1};
  background: ${({ theme }) => theme.colors.background.bg3};
`;

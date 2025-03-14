"use client";
import { breakPointsMd } from "@/constants/screen";
import { Row } from "antd";
import styled, { keyframes } from "styled-components";

export const BodyWrapper = styled.body`
  overflow-x: hidden;
  padding: 0;
  margin: 0;
  min-height: 100dvh;
  width: 100% !important;
  .ant-table-wrapper
    .ant-table-ping-right:not(.ant-table-has-fix-right)
    .ant-table-container::after {
    box-shadow: inset 10px 0 8px -8px rgba(5, 5, 5, 0.06);
  }

  .ant-layout-header {
    .ant-menu {
      border: none !important;
    }
  }
`;

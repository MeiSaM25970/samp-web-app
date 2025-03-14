"use client";
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

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  25%{
    transform: rotate(5deg);

  }
  50%{
  transform: rotate(0deg);

  }
  75%{
  transform: rotate(-5deg);

  }
  100% {
    transform: rotate(0deg);
  }`;
export const HomeContainer = styled(Row)`
  display: flex;
  width: 100%;
  padding: 56px 32px;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  .fontHolder {
    color: ${({ theme }) => theme.colors.text.primaryText};
    text-align: center;
    font-family: "Doran Classic Dots";
    font-size: 32px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  .itemHolder {
    width: 180px;
    height: 180px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 24px;
    border-radius: 12px;
    border: 2px solid ${({ theme }) => theme.colors.border.bor2};
    background: ${({ theme }) => theme.colors.background.baseBg};
    cursor: pointer;
    /* 3 */
    box-shadow: 2px 6px 16px 0px rgba(0, 0, 0, 0.18);
    &:hover {
      transition: all 0.3s;
      scale: 1.05;
      animation: ${rotate} 0.5s linear infinite;
      background: ${({ theme }) => theme.colors.background.hoverBg};
    }
  }
  .itemText {
    color: ${({ theme }) => theme.colors.text.primaryText};
    font-family: "Doran Classic Dots";
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

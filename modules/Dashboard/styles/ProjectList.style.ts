"use client";
import { breakPointsMd } from "@/constants/screen";
import { Row } from "antd";
import styled from "styled-components";

export const ProjectListContainer = styled(Row)`
  padding: 16px;
  border-radius: 0 0 12px 12px;
  background: ${({ theme }) => theme.colors.background.bg3};
  box-shadow: 0px 4px 6px 0px rgba(19, 19, 19, 0.25);
  .filterIcon {
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
    cursor: pointer;
  }
  .searchIcon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .ant-input {
    border-radius: 0 8px 8px 0;
  }
  .ant-input-outlined:focus {
    box-shadow: none !important;
  }

  .input-slide {
    width: 0;
    opacity: 0;
    transform: translateX(100%);
    transition: width 0.3s ease, opacity 0.3s ease, transform 0.3s ease;
  }

  .input-slide.show {
    width: 200px; /* عرض دلخواه */
    opacity: 1;
    transform: translateX(0);
  }
  @media only screen and(max-width:${breakPointsMd}px ) {
  }
`;

"use client";
import { Flex } from "antd";
import styled from "styled-components";

export const FilesContainer = styled(Flex)`
  .container {
    border-radius: 12px;
    border: 2px solid var(--Border-Bor-2, #e1e1e1);
    width: 160px;
    height: 160px;
  }
  .file {
    position: relative;
    transition: 0.3s;
    &:hover::after {
      content: "";

      opacity: 0;
    }
    &:hover::after {
      content: "دانلود فایل";
      color: #fff;
      position: absolute;
      /* inset: 0; */
      background: rgba(0, 0, 0, 0.5);
      cursor: pointer;
      transition: opacity 0.3s;
      top: 0;
      left: 0;
      z-index: 2;
      bottom: 0;
      right: 0;
      opacity: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 12px;
      width: 100%;
      height: 100%;
    }
  }
  /* lightgray 50% / cover no-repeat */
`;

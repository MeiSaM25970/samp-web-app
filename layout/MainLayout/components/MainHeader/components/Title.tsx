"use client";
import { ROUTES } from "@/constants/Routes";
import { Flex } from "antd";
import Link from "next/link";
import { FC } from "react";

export const HeaderTitle: FC = () => {
  return (
    <Flex gap={16} align="center">
      <Link href={ROUTES.home}>
        <span className="samp">SAMP</span>
      </Link>
      <Flex gap={4} align="center">
        <span className="des">سامانه جامع مدیریت پروژه</span>
        <span className="sampFa">سمپ</span>
      </Flex>
    </Flex>
  );
};

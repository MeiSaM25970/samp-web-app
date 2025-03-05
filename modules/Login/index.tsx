"use client";
import { FC } from "react";
import { LoginContainer } from "./style";
import { Col, Flex } from "antd";
import Image from "next/image";
import { S3 } from "@/components/UiKit/Typography";

export const Login: FC = () => {
  return (
    <LoginContainer>
      <Col md={8} sm={12} xs={12} className="loginFormContainer">
        <Flex justify="center" align="center" vertical>
          <Image
            src="/images/loginFormLogo.svg"
            alt="loginFormLogo"
            width={140}
            height={65}
          />
          <div className="!w-full !bg-black">
            <Flex justify="center" align="center" gap={4}>
              <div className="rectangleHolder"></div>
              <S3 className="whitespace-nowrap !text-[red]">
                سامانه مدیریت پروژه‌ها
              </S3>
              <div className="rectangleHolder"></div>
            </Flex>
          </div>
        </Flex>
      </Col>
    </LoginContainer>
  );
};

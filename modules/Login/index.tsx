"use client";
import { FC } from "react";
import { LoginContainer } from "./style";
import { Col, Flex } from "antd";
import Image from "next/image";
import { S3 } from "@/components/UiKit/Typography";

export const Login: FC = () => {
  return (
    <LoginContainer>
      <Col md={4} sm={12} xs={12} className="loginFormContainer">
        <Flex justify="center" align="center">
          <Image
            src="/images/loginFormLogo.svg"
            alt="loginFormLogo"
            width={140}
            height={65}
          />
          <S3>سامانه مدیریت مدیریت پروژه‌ها</S3>
        </Flex>
      </Col>
    </LoginContainer>
  );
};

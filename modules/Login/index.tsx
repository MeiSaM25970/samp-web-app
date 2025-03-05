"use client";
import { FC } from "react";
import { LoginContainer } from "./style";
import { Col, Flex, Form } from "antd";
import Image from "next/image";
import { S3 } from "@/components/UiKit/Typography";
import { FormItem } from "@/components/UiKit/FormItem";
import { InputUikit } from "@/components/UiKit/Inputs";
import { useForm } from "antd/es/form/Form";

export const Login: FC = () => {
  const [form] = useForm();
  return (
    <Form form={form}>
      <LoginContainer>
        <Col md={6} sm={12} xs={12} className="loginFormContainer">
          <Flex justify="center" align="center" vertical>
            <Image
              src="/images/loginFormLogo.svg"
              alt="loginFormLogo"
              width={140}
              height={65}
            />
            <div className="!w-full">
              <Flex justify="center" align="center" gap={4}>
                <div className="rectangleHolder"></div>
                <S3 className="whitespace-nowrap">سامانه مدیریت پروژه‌ها</S3>
                <div className="rectangleHolder"></div>
              </Flex>
            </div>
          </Flex>
          <Flex>
            <FormItem name={"userName"} label="نام کاربری">
              <InputUikit />
            </FormItem>
          </Flex>
        </Col>
      </LoginContainer>
    </Form>
  );
};

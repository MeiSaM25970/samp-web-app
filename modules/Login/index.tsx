"use client";
import { FC } from "react";
import { LoginContainer } from "./style";
import { Button, Col, Divider, Flex, Form, Row } from "antd";
import Image from "next/image";
import { S3 } from "@/components/UiKit/Typography";
import { FormItem } from "@/components/UiKit/FormItem";
import { PasswordUikit } from "@/components/UiKit/Inputs";
import { useForm } from "antd/es/form/Form";
import { UserNameUikit } from "@/components/UiKit/Inputs/UserName";
import { useTheme } from "@/app/theme";
import { useMutation } from "@tanstack/react-query";
import { IUserInfo } from "@/services/BaseInfo/models";
import { useRouter } from "next/navigation";
import { loginAction } from "@/app/actions/login";
import { fireError } from "@/helper/fireError";

export const Login: FC = () => {
  const [form] = useForm();
  const {
    theme: { colors },
  } = useTheme();
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: IUserInfo) => {
      const { token, error } = await loginAction(values);
      if (error) return fireError("خطا", error);
      if (token) {
        router.replace("/dashboard");
        return;
      }
      return token;
    },
  });

  return (
    <Form form={form} onFinish={mutate}>
      <LoginContainer>
        <Col md={10} xs={22} lg={5} className="loginFormContainer">
          <Row gutter={[0, 24]}>
            <Col span={24}>
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
                    <S3 className="whitespace-nowrap">
                      سامانه مدیریت پروژه‌ها
                    </S3>
                    <div className="rectangleHolder"></div>
                  </Flex>
                </div>
              </Flex>
            </Col>
            <Col span={24}>
              <Flex vertical gap={16}>
                <FormItem
                  name={"username"}
                  label="نام کاربری"
                  rules={[{ required: true }]}
                >
                  <UserNameUikit />
                </FormItem>
                <FormItem
                  name={"password"}
                  label="رمز عبور"
                  rules={[{ required: true }]}
                >
                  <PasswordUikit />
                </FormItem>
              </Flex>
            </Col>
            <Col span={24}>
              <Flex gap={32} vertical>
                <Divider
                  dashed
                  style={{ color: colors.border.borInput, margin: 0 }}
                />
                <Button
                  type="primary"
                  onClick={form.submit}
                  loading={isPending}
                >
                  ورود
                </Button>
              </Flex>
            </Col>
          </Row>
        </Col>
      </LoginContainer>
    </Form>
  );
};

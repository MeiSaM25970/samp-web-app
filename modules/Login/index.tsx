"use client";
import { FC } from "react";
import { LoginContainer } from "./style";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";

export const Login: FC = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const onFinish = async (value: { username: string; password: string }) => {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(value),
    });
    console.log({ response });
    if (response.status === 200) {
      console.log("here");
      router.push("/dashboard");
    }
  };
  return (
    <LoginContainer>
      <Form onFinish={onFinish} form={form}>
        <Form.Item name={"username"} label="Username">
          <Input />
        </Form.Item>
        <Form.Item name={"password"} label="Password">
          <Input />
        </Form.Item>
        <Button onClick={form.submit}>Submit</Button>
      </Form>
    </LoginContainer>
  );
};

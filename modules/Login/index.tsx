"use client";
import { FC } from "react";
import { LoginContainer } from "./style";
import { Button, Form, Input } from "antd";

export const Login: FC = () => {
  const onFinish = async (value: { username: string; password: string }) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(value),
    });
  };
  return (
    <LoginContainer>
      <Form onFinish={onFinish}>
        <Form.Item name={"username"} label="Username">
          <Input />
        </Form.Item>
        <Form.Item name={"password"} label="Password">
          <Input />
        </Form.Item>
        <Button>Submit</Button>
      </Form>
    </LoginContainer>
  );
};

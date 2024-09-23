import { useMutation } from "@tanstack/react-query";
import { App, Button, Card, Form, Input, Row } from "antd";
import React from "react";
import styled from "styled-components";

import { loginAction } from "../actions/auth";
import { useAuthContext } from "../context/AuthContext";

type FieldType = { name?: string; password?: string };

const Login: React.FC = () => {
  const { message } = App.useApp();
  const { login } = useAuthContext();
  const { mutate: handleSubmit, isPending } = useMutation({
    mutationFn: (values: LoginPayload) => loginAction(values),
    onSuccess: (data) => {
      login(data.data.token);
    },
    onError: (error) => {
      message.error(
        error.message
          ? error.message
          : "An error occurred. Please try again later."
      );
    },
  });

  return (
    <LoginWrapper>
      <Card title="Login" bordered>
        <Form onFinish={handleSubmit} layout="vertical">
          <Form.Item<FieldType>
            label="Username"
            name="name"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Row justify="end">
            <Button
              type="primary"
              loading={isPending}
              disabled={isPending}
              htmlType="submit"
            >
              Login
            </Button>
          </Row>
        </Form>
      </Card>
    </LoginWrapper>
  );
};

export default Login;

export const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: #f2f4f7;
`;

import { useMutation } from "@tanstack/react-query";
import { App, Button, Form, Input } from "antd";
import React from "react";
import styled from "styled-components";

import { loginAction } from "../actions/auth";
import { useAuthContext } from "../context/AuthContext";

type FieldType = { name?: string; password?: string };

const Login: React.FC = () => {
  const { message } = App.useApp();
  const { login } = useAuthContext();
  const { mutate: handleSubmit } = useMutation({
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
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
      >
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

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </LoginWrapper>
  );
};

export default Login;

export const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

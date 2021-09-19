import { Button, Form, FormProps, Input } from 'antd';
import React, { useCallback } from 'react';
import { breakpoints } from '../config';

interface Props extends FormProps {}

type FormValues = {
  email: string;
};

const ForgotPasswordForm: React.FC<Props> = () => {
  const [form] = Form.useForm();

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      form.validateFields().then((values: FormValues) => {
        console.log('Received values of form: ', values);
      });
    },
    [form]
  );

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      style={{
        margin: '0 auto',
        maxWidth: breakpoints.small,
      }}
    >
      <Form.Item
        name="email"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          Reset Password
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ForgotPasswordForm;

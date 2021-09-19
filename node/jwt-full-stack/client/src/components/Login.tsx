import { Button, Checkbox, Form, FormProps, Input, message } from 'antd';
import React, { useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Auth from '../auth';
import { breakpoints } from '../config';
import { useLoginMutation, UserDocument } from '../query';

interface Props extends FormProps {}

type FormValues = {
  email: string;
  password: string;
  remember: Boolean;
};

const NormalLoginForm: React.FC<Props> = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [login] = useLoginMutation();

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      form.validateFields().then(async (values: FormValues) => {
        const { email, password } = values;
        const response = await login({
          variables: {
            email,
            password,
          },
          update: (store, { data }) => {
            if (!data) {
              return null;
            }

            // update apollo in-memory cache
            store.writeQuery({
              query: UserDocument,
              data: {
                user: data.login.user,
              },
            });
          },
        });

        if (response.data!.login.accessToken) {
          Auth.setAccessToken(response.data!.login.accessToken);
          setTimeout(() => history.push('/dashboard'), 0);
        } else {
          Auth.setAccessToken('');
          message.error('Non-existent user or wrong password. Please retry');
        }
      });
    },
    [form, history, login]
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
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input type="password" placeholder="Password" />
      </Form.Item>
      <Form.Item name="remember" valuePropName="checked" initialValue={true}>
        <Checkbox>Remember me</Checkbox>
        <Link to="/forgot-password" style={{ float: 'right' }}>
          Forgot password
        </Link>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          Log in
        </Button>
        Or <Link to="/register">register now!</Link>
      </Form.Item>
    </Form>
  );
};

export default NormalLoginForm;

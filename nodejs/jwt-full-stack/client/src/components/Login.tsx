import React, { useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { Breakpoints } from '../config';
import { useLoginMutation, UserDocument } from '../query';
import Auth from '../auth';

interface Props extends FormComponentProps {}

type FormValues = {
  email: string;
  password: string;
  remember: Boolean;
};

const NormalLoginForm: React.FC<Props> = ({ form }) => {
  const { getFieldDecorator } = form;
  const history = useHistory();
  const [login] = useLoginMutation();

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      form.validateFields(async (err: any, values: FormValues) => {
        if (!err) {
          const { email, password } = values;
          const response = await login({
            variables: {
              email,
              password
            },
            update: (store, { data }) => {
              if (!data) {
                return null;
              }

              // update apollo in-memory cache
              store.writeQuery({
                query: UserDocument,
                data: {
                  user: data.login.user
                }
              });
            }
          });

          if (response.data!.login.accessToken) {
            Auth.setAccessToken(response.data!.login.accessToken);
            setTimeout(() => history.push('/dashboard'), 0);
          } else {
            Auth.setAccessToken('');
            message.error('Non-existent user or wrong password. Please retry');
          }
        }
      });
    },
    [form, history, login]
  );

  return (
    <Form
      onSubmit={handleSubmit}
      style={{
        margin: '0 auto',
        maxWidth: Breakpoints.Small
      }}
    >
      <Form.Item>
        {getFieldDecorator('email', {
          rules: [
            {
              type: 'email',
              message: 'The input is not valid E-mail!'
            },
            {
              required: true,
              message: 'Please input your E-mail!'
            }
          ]
        })(
          <Input
            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Email"
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: 'Please input your Password!' }]
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password"
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('remember', {
          valuePropName: 'checked',
          initialValue: true
        })(<Checkbox>Remember me</Checkbox>)}
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

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(
  NormalLoginForm
);

export default WrappedNormalLoginForm;

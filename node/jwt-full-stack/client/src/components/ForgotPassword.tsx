import React, { useCallback } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { Breakpoints } from '../config';

interface Props extends FormComponentProps {}

type FormValues = {
  email: string;
};

const ForgotPasswordForm: React.FC<Props> = ({ form }) => {
  const { getFieldDecorator } = form;

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      form.validateFields((err: any, values: FormValues) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
    [form]
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
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          Reset Password
        </Button>
      </Form.Item>
    </Form>
  );
};

const WrappedForgotPasswordForm = Form.create({ name: 'normal_login' })(
  ForgotPasswordForm
);

export default WrappedForgotPasswordForm;

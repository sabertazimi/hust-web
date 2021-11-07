import { Button, Checkbox, Form, FormProps, Input, message } from 'antd';
import { Rule } from 'rc-field-form/lib/interface';
import React, { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { breakpoints } from '../config';
import { useRegisterMutation } from '../query';

type ValidateCallback<V> = (errors?: any, values?: V) => void;

interface Props extends FormProps {}

type FormValues = {
  email: string;
  password: string;
  confirm: string;
  agreement: Boolean;
};

const RegistrationForm: React.FC<Props> = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [register] = useRegisterMutation();
  const [confirmDirty, setConfirmDirty] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      form.validateFields().then(async (values: FormValues) => {
        const { email, password } = values;
        const response = await register({
          variables: {
            email,
            password,
          },
        });

        if (response.data!.register) {
          setTimeout(() => navigate('/'), 0);
        } else {
          message.error(`Email ${email} already registered`);
        }
      });
    },
    [form, register, navigate]
  );

  const handleConfirmBlur = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setConfirmDirty(confirmDirty || !!value);
    },
    [confirmDirty]
  );

  const compareToFirstPassword = useCallback(
    (rule: Rule, value: string, callback: ValidateCallback<string>) => {
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    },
    [form]
  );

  const validateToNextPassword = useCallback(
    async (rule: Rule, value: string, callback: ValidateCallback<string>) => {
      if (value && confirmDirty) await form.validateFields();
      callback();
    },
    [form, confirmDirty]
  );

  const validateToAgreement = useCallback(
    (rule: Rule, value: Boolean, callback: ValidateCallback<Boolean>) => {
      if (!value) {
        callback('Please read the agreement!');
      } else {
        callback();
      }
    },
    []
  );

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      onFinish={handleSubmit}
      style={{
        margin: '0 auto',
        maxWidth: breakpoints.small,
      }}
    >
      <Form.Item
        label="E-mail"
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
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        hasFeedback
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
          {
            validator: validateToNextPassword,
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Confirm Password"
        hasFeedback
        name="confirm"
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          {
            validator: compareToFirstPassword,
          },
        ]}
      >
        <Input.Password onBlur={handleConfirmBlur} />
      </Form.Item>
      <Form.Item
        {...tailFormItemLayout}
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: validateToAgreement,
          },
        ]}
      >
        <Checkbox>
          I have read the <Link to="/agreement">agreement</Link>
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm;

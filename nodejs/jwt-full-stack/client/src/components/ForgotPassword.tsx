import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';

interface Props extends FormComponentProps {}

type FormValues = {
  email: string;
};

class ForgotPasswordForm extends React.Component<Props> {
  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: FormValues) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form
        onSubmit={this.handleSubmit}
        style={{
          margin: '0 auto',
          maxWidth: 1024
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
  }
}

const WrappedForgotPasswordForm = Form.create({ name: 'normal_login' })(
  ForgotPasswordForm
);

export default WrappedForgotPasswordForm;

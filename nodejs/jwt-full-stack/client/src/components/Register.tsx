import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Checkbox, Button } from 'antd';
import { FormComponentProps, ValidationRule } from 'antd/lib/form/Form';

type ValidateCallback<V> = (errors?: any, values?: V) => void;

interface Props extends FormComponentProps {}

type FormValues = {
  email: string;
  password: string;
  confirm: string;
  agreement: Boolean;
};

interface State {
  confirmDirty: Boolean;
}

class RegistrationForm extends React.Component<Props, State> {
  state = {
    confirmDirty: false
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err: any, values: FormValues) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleConfirmBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (
    rule: ValidationRule,
    value: string,
    callback: ValidateCallback<string>
  ) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (
    rule: ValidationRule,
    value: string,
    callback: ValidateCallback<string>
  ) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  validateToAgreement = (
    rule: ValidationRule,
    value: Boolean,
    callback: ValidateCallback<Boolean>
  ) => {
    if (!value) {
      callback('Please read the agreement!');
    } else {
      callback();
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    return (
      <Form
        {...formItemLayout}
        onSubmit={this.handleSubmit}
        style={{
          margin: '0 auto',
          maxWidth: 1024
        }}
      >
        <Form.Item label="E-mail">
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
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!'
              },
              {
                validator: this.validateToNextPassword
              }
            ]
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="Confirm Password" hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!'
              },
              {
                validator: this.compareToFirstPassword
              }
            ]
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
            rules: [
              {
                validator: this.validateToAgreement
              }
            ]
          })(
            <Checkbox>
              I have read the <Link to="/agreement">agreement</Link>
            </Checkbox>
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(
  RegistrationForm
);

export default WrappedRegistrationForm;

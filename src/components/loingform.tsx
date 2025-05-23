import { useState } from 'react';
import { Form, Input, Button, Typography, message, Spin } from 'antd';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { mockLogin } from '@/utils/auth'; // ใช้ mockLogin หรือใส่ logic ของคุณเอง

const { Link } = Typography;

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState('');

  const onFinish = async (values: any) => {
    setLoading(true);
    const success = await mockLogin(values.email, values.password);
    setLoading(false);

    if (success) {
      setPasswordMessage('Password correct');
      message.success('Login successful!');
      // TODO: Redirect to dashboard
    } else {
      setPasswordMessage('Password incorrect');
      message.error('Incorrect credentials');
    }
  };

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      requiredMark={false}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Please input your email!' },
          { type: 'email', message: 'Invalid email format' },
        ]}
      >
        <Input placeholder="name@email.com" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          { required: true, message: 'Please input your password!' },
          { min: 8, message: 'Password must be at least 8 characters' },
        ]}
      >
        <Input.Password
          placeholder="Enter your password"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
      </Form.Item>

      {passwordMessage && (
        <div
          style={{
            textAlign: 'center',
            color: passwordMessage === 'Password correct' ? 'green' : 'red',
            marginBottom: '1rem',
          }}
        >
          {passwordMessage}
        </div>
      )}

      <Form.Item shouldUpdate>
        {({ getFieldsError }) => {
          const hasErrors = getFieldsError().some(field => field.errors.length > 0);
          return (
            <Button
              type="primary"
              htmlType="submit"
              block
              disabled={hasErrors || loading}
            >
              {loading ? <Spin /> : 'Login'}
            </Button>
          );
        }}
      </Form.Item>

      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <Link href="/forgot-password">Forgot Password?</Link> |{' '}
        <Link href="/register">Create Account</Link>
      </div>

      <style jsx>{`
        .login-form {
          max-width: 400px;
          margin: 5rem auto;
          padding: 2rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          background: #fff;
        }

        @media (max-width: 480px) {
          .login-form {
            margin: 2rem 1rem;
            padding: 1.5rem;
          }
        }

        .ant-btn-primary {
          background-color: #4caf50;
          border-color: #4caf50;
        }

        .ant-btn-primary:hover {
          background-color:rgb(0, 248, 12);
          border-color: #45a049;
        }
      `}</style>
    </Form>
  );
}

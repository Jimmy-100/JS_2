import { Button, Card, Input, Typography } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';

const { Title, Text } = Typography;

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username.trim() && password.trim()) {
      router.push('/');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(to right, #e0eafc, #cfdef3)',
        padding: 20,
      }}
    >
      <Card
        style={{
          width: 350,
          borderRadius: 10,
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
        }}
        bodyStyle={{ padding: 30 }}
      >
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <Title level={3} style={{ margin: 0 }}>
            Login
          </Title>
          <Text type="secondary">Sign in to continue</Text>
        </div>

        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginBottom: 15, borderRadius: 6 }}
        />

        <Input.Password
          placeholder="Password"
          value={password}
          
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: 20, borderRadius: 6 }}
        />

        <Button
          type="primary"
          block
          style={{ borderRadius: 6 }}
          onClick={handleLogin}
        >
          Login
        </Button>

        <div style={{ marginTop: 20, textAlign: 'center' }}>
          <Text type="secondary">
            Forgot password?{' '}
            <a onClick={() => router.push('/forgot-password')}>Click here</a>
          </Text>
        </div>
      </Card>
    </div>
  );
}

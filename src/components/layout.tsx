import { Layout, Menu, Button, Drawer } from 'antd';
import {
  MenuOutlined,
  AppstoreOutlined,
  ToolOutlined,
  UserOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import { useRouter } from 'next/router';

const { Header, Content, Footer } = Layout;

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const menuItems = [
    { label: ' Home', path: '/', icon: <HomeOutlined /> },
    { label: ' Product List', path: '/prods', icon: <AppstoreOutlined /> },
    { label: ' Manage Products', path: '/mprods', icon: <ToolOutlined /> },
    { label: ' Users', path: '/musers', icon: <UserOutlined /> },
  ];

  const handleNavigate = (path: string) => {
    setOpen(false);
    setTimeout(() => router.push(path), 200);
  };

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <Header style={{
        background: '#001529',
        padding: '0 16px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        display: 'flex',
        alignItems: 'center',
      }}>
        <Button
          type="text"
          icon={<MenuOutlined style={{ color: '#fff', fontSize: 20 }} />}
          onClick={() => setOpen(true)}
        />
        <h2 style={{
          color: 'white',
          marginLeft: 16,
          fontSize: '20px',
          fontWeight: 600,
          fontFamily: 'Segoe UI, sans-serif',
        }}>
          Grilled Fish Shop 🐟🔥
        </h2>
      </Header>

      <Drawer
        title={<span style={{ fontWeight: 600 }}>📋 Navigation Menu</span>}
        placement="left"
        closable
        onClose={() => setOpen(false)}
        open={open}
        bodyStyle={{ padding: 0 }}
      >
        <Menu mode="vertical" selectable={false} style={{ borderRight: 0 }}>
          {menuItems.map((item, i) => (
            <Menu.Item
              key={i}
              icon={item.icon}
              style={{ fontWeight: 500 }}
              onClick={() => handleNavigate(item.path)}
            >
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      </Drawer>

      <Content style={{ padding: '24px 16px', background: '#fff' }}>
        {children}
      </Content>

      <Footer style={{
        textAlign: 'center',
        background: '#f0f2f5',
        fontWeight: 500,
        padding: '12px 16px',
        borderTop: '1px solid #e0e0e0',
      }}>
        © {new Date().getFullYear()} Grilled Fish Shop by Jimmy 🐠
      </Footer>
    </Layout>
  );
}

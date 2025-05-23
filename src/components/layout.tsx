import React, { ReactNode } from 'react';
import { Layout, Menu } from 'antd';

const { Header, Sider, Content } = Layout;

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <Layout>
      {/* Header */}
      <Header
        style={{
          height: 70,
          backgroundColor: '#001529',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 20,
          fontSize: 20,
        }}
      >
        My App
      </Header>

      <Layout>
        {/* Sider */}
        <Sider
          width={200}
          style={{
            backgroundColor: '#fff',
            minHeight: 'calc(100vh - 70px)',
            borderRight: '1px solid #f0f0f0',
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            style={{ height: '100%', borderRight: 0 }}
            items={[
              { key: '1', label: 'Home' },
              { key: '2', label: 'Profile' },
              { key: '3', label: 'Settings' },
            ]}
          />
        </Sider>

        {/* Content */}
        <Content
          style={{
            margin: '10px 20px 0 10px',
            padding: 20,
            background: '#f5f5f5',
            minHeight: 'calc(100vh - 70px - 20px)',
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;

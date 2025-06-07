// pages/prods.tsx
import { Card, Col, Row, Typography, Tag } from 'antd';
import AppLayout from '../components/layout';
import { ShoppingCartOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

export default function ProdsPage() {
    const fakeProducts = [
        { id: 1, name: 'Min ', price: '550,000 Kip', description: 'Fresh and delicious grilled fish' },
        { id: 2, name: 'Jenny Fish', price: '750,000 Kip', description: 'Soft texture with perfect seasoning' },
    ];

    return (
        <AppLayout>
        <div style={{ marginBottom: 24 }}>
            <Title level={2}>📦 Product List</Title>
            <Paragraph type="secondary">Explore our top-quality grilled fish selections 🐟🔥</Paragraph>
        </div>

        <Row gutter={[24, 24]}>
            {fakeProducts.map((p) => (
            <Col xs={24} sm={12} md={8} lg={6} key={p.id}>
                <Card
                hoverable
                title={<span style={{ fontWeight: 600 }}>{p.name}</span>}
                bordered={false}
                actions={[<ShoppingCartOutlined key="buy" />]}
                style={{
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    transition: '0.3s',
                }}
                >
                <Paragraph>{p.description}</Paragraph>
                <Tag color="green" style={{ fontSize: '16px', padding: '4px 12px' }}>
                    {p.price}
                </Tag>
                </Card>
            </Col>
            ))}
        </Row>
        </AppLayout>
    );
    }

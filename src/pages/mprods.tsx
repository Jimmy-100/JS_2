    // pages/mprods.tsx
    import { Button, Form, Input, Modal, Space, Table, Typography, Tag } from 'antd';
    import { useState } from 'react';
    import AppLayout from '../components/layout';
    import type { ColumnsType } from 'antd/es/table';
    import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

    interface Product {
    id: number;
    name: string;
    price: string;
    }

    const { Title } = Typography;

    export default function ManageProductsPage() {
    const [products, setProducts] = useState<Product[]>([
        { id: 1, name: 'ເບີ 1', price: '₭150,000 kip' },
        { id: 2, name: 'ເບີ 2', price: '150,000 kip' },
        { id: 3, name: 'VIP', price: '1,150,000 kip' },
    ]);

    const [editing, setEditing] = useState<Product | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [form] = Form.useForm();

    const showModal = (record: Product | null = null) => {
        setEditing(record);
        setModalOpen(true);
        form.setFieldsValue(record || { name: '', price: '' });
    };

    const handleOk = () => {
        form.validateFields().then((values) => {
        if (editing) {
            setProducts((prev) =>
            prev.map((p) => (p.id === editing.id ? { ...p, ...values } : p))
            );
        } else {
            setProducts((prev) => [...prev, { id: Date.now(), ...values }]);
        }
        setModalOpen(false);
        setEditing(null);
        });
    };

    const handleDelete = (id: number) => {
        setProducts((prev) => prev.filter((p) => p.id !== id));
    };

    const columns: ColumnsType<Product> = [
        {
        title: '📛 Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <strong>{text}</strong>,
        },
        {
        title: '💰 Price',
        dataIndex: 'price',
        key: 'price',
        render: (price) => <Tag color="green">{price}</Tag>,
        },
        {
        title: '⚙️ Actions',
        key: 'action',
        render: (_, record) => (
            <Space>
            <Button
                icon={<EditOutlined />}
                onClick={() => showModal(record)}
            >
                Edit
            </Button>
            <Button
                icon={<DeleteOutlined />}
                danger
                onClick={() => handleDelete(record.id)}
            >
                Delete
            </Button>
            </Space>
        ),
        },
    ];

    return (
        <AppLayout>
        <div style={{ marginBottom: 24 }}>
            <Title level={2}>🛠 Manage Products</Title>
        </div>

        <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => showModal()}
            style={{ marginBottom: 16 }}
        >
            Add Product
        </Button>

        <Table
            rowKey="id"
            dataSource={products}
            columns={columns}
            pagination={{ pageSize: 5 }}
            bordered
        />

        <Modal
            open={isModalOpen}
            title={editing ? '✏️ Edit Product' : '➕ Add New Product'}
            onCancel={() => {
            setModalOpen(false);
            setEditing(null);
            }}
            onOk={handleOk}
            okText={editing ? 'Update' : 'Create'}
        >
            <Form layout="vertical" form={form}>
            <Form.Item
                name="name"
                label="Product Name"
                rules={[{ required: true, message: 'Please input product name!' }]}
            >
                <Input placeholder="e.g. VIP Grill" />
            </Form.Item>
            <Form.Item
                name="price"
                label="Price (₭)"
                rules={[{ required: true, message: 'Please input price!' }]}
            >
                <Input placeholder="e.g. 150,000" />
            </Form.Item>
            </Form>
        </Modal>
        </AppLayout>
    );
    }

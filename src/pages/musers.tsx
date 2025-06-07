// pages/musers.tsx
import { Button, Form, Input, Modal, Space, Table, Typography, Tag } from 'antd';
import { useState } from 'react';
import AppLayout from '../components/layout';
import type { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined, PlusOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';

interface User {
    id: number;
    name: string;
    email: string;
    }

    const { Title } = Typography;

    export default function ManageUsersPage() {
    const [users, setUsers] = useState<User[]>([
        { id: 1, name: 'Jim', email: 'jim@example.com' },
        { id: 2, name: 'Jay', email: 'jay@example.com' },
    ]);
    const [editing, setEditing] = useState<User | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [form] = Form.useForm();

    const showModal = (record: User | null = null) => {
        setEditing(record);
        setModalOpen(true);
        form.setFieldsValue(record || { name: '', email: '' });
    };

    const handleOk = () => {
        form.validateFields().then((values) => {
        if (editing) {
            setUsers((prev) =>
            prev.map((u) => (u.id === editing.id ? { ...u, ...values } : u))
            );
        } else {
            setUsers((prev) => [...prev, { id: Date.now(), ...values }]);
        }
        setModalOpen(false);
        setEditing(null);
        });
    };

    const handleDelete = (id: number) => {
        setUsers((prev) => prev.filter((u) => u.id !== id));
    };

    const columns: ColumnsType<User> = [
        {
        title: '👤 Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => (
            <span style={{ fontWeight: 500 }}>
            <UserOutlined style={{ marginRight: 8 }} />
            {text}
            </span>
        ),
        },
        {
        title: '📧 Email',
        dataIndex: 'email',
        key: 'email',
        render: (text) => <Tag icon={<MailOutlined />} color="blue">{text}</Tag>,
        },
        {
        title: '⚙️ Actions',
        key: 'action',
        render: (_, record) => (
            <Space>
            <Button icon={<EditOutlined />} onClick={() => showModal(record)}>
                Edit
            </Button>
            <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>
                Delete
            </Button>
            </Space>
        ),
        },
    ];

    return (
        <AppLayout>
        <div style={{ marginBottom: 24 }}>
            <Title level={2}>👤 Manage Users</Title>
        </div>

        <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => showModal()}
            style={{ marginBottom: 16 }}
        >
            Add User
        </Button>

        <Table
            rowKey="id"
            dataSource={users}
            columns={columns}
            pagination={{ pageSize: 5 }}
            bordered
        />

        <Modal
            open={isModalOpen}
            title={editing ? '✏️ Edit User' : '➕ Add User'}
            onCancel={() => setModalOpen(false)}
            onOk={handleOk}
            okText={editing ? 'Update' : 'Create'}
        >
            <Form layout="vertical" form={form}>
            <Form.Item
                name="name"
                label="Full Name"
                rules={[{ required: true, message: 'Please input user name!' }]}
            >
                <Input placeholder="e.g. John Doe" />
            </Form.Item>
            <Form.Item
                name="email"
                label="Email Address"
                rules={[{ required: true, type: 'email', message: 'Please input valid email!' }]}
            >
                <Input placeholder="e.g. example@example.com" />
            </Form.Item>
            </Form>
        </Modal>
        </AppLayout>
    );
    }

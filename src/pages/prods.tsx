'use client';

import React, { useEffect, useState } from 'react';
import { Table, Typography, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import AppLayout from '../components/layout';

const { Title, Paragraph } = Typography;

// สมมุติว่า API ส่งข้อมูลมาในรูปแบบนี้
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

export default function ProdsPage() {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

 useEffect(() => {
  axios.get('http://localhost:3500/products')
    .then(res => {
      console.log('API Response:', res.data); // ✅ ตรงนี้จะช่วยมาก
      setData(res.data); // เปลี่ยนชั่วคราวเพื่อดูผลลัพธ์
    })
    .catch(err => {
      console.error('Error fetching data:', err);
    })
    .finally(() => {
      setLoading(false);
    });
}, []);

  const columns: ColumnsType<Product> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'ຊື່ສິນຄ້າ',
      dataIndex: 'pro_name',
      key: 'pro_name',
    },
    {
      title: 'ລາຄາ',
      dataIndex: 'price',
      key: 'price',
      render: (price) => <Tag color="green">{price.toLocaleString()} Kip</Tag>,
    },
    {
      title: 'ລາຍລະອຽດ',
      dataIndex: 'cat_id',
      key: 'cat_id',
    },
  ];

  return (
    <AppLayout>
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>📦 ລາຍການສິນຄ້າ</Title>
        <Paragraph type="secondary">ສິນຄ້າຍ່າງຊັ້ນນຳໃຫ້ເລືອກ 🐟🔥</Paragraph>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
        bordered
        className="custom-table"
        pagination={{ pageSize: 10 }}
      />
    </AppLayout>
  );
}

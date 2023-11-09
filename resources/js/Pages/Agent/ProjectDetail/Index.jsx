import React, { useRef, useEffect, useState } from 'react';
import AgentLayout from '@/Layouts/AgentLayout';
import { Head, usePage, router } from "@inertiajs/react";
import { Button, Col, Row, Space, Table, Popconfirm, message, Tooltip, Card } from 'antd';
import { PlusOutlined, ArrowLeftOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import "./style.scss";

const Index = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();

    const { project, results } = usePage().props;

    useEffect(() => {
        setData(results);
        setLoading(false);
    }, []);

    const handleBack = () => {
        router.get('/project')
    }

    const handleAdd = () => {
        router.get(`/project/detail/addEdit?id=${0}&pid=${project.id}`)
    }

    const handleEdit = (id) => {
        router.get(`/project/detail/addEdit?id=${id}&pid=${project.id}`)
    }

    const handleDelete = (id) => {
        const formData = {
            id: id,
            project_id: project.id
        };
        router.post('/project/detail/delete', formData, {
            onSuccess: () => {
                message.success('Data Deleted Successfully !');
            },
            onFinish: () => {
                router.get(`/project/detail?pid=${project.id}`)
            }
        })
    };

    const handleCancel = () => {
        message.error('Operation Cancelled !');
    };

    const columns = [
        {
            title: 'Property',
            key: 'property',
            width: 'auto',
            render: (_, record) => (
                <Space>
                    <span>{record.property} / {record.property_type}</span>
                </Space>
            )
        },
        {
            title: 'Total Units',
            dataIndex: "total_units",
            key: 'total_units',
            width: '10%',
            align: "center"
        },
        {
            title: 'Sizes (sq.ft)',
            key: 'sizes',
            width: '15%',
            render: (_, record) => (
                <Space>
                    <span>{record.size_from} - {record.size_to}</span>
                </Space>
            )
        },
        {
            title: 'Price Range',
            key: 'price_range',
            width: '15%',
            render: (_, record) => (
                <Space>
                    <span>AED {record.price_from} - {record.price_to}</span>
                </Space>
            )
        },
        {
            title: '',
            key: 'action',
            width: '8%',
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title="Edit Row" color="orange">
                        <Button style={{ color: "orange", borderColor: "orange" }} size="middle" shape="circle" icon={<EditOutlined />} onClick={() => handleEdit(record.id)} />
                    </Tooltip>
                    <Popconfirm
                        title="Delete"
                        description="Are you sure to delete?"
                        onConfirm={() => handleDelete(record.id)}
                        onCancel={handleCancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Tooltip title="Delete Row" color="red">
                            <Button danger size="middle" shape="circle" icon={<DeleteOutlined />} />
                        </Tooltip>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <Card bordered={false} style={{ width: "100%", borderRadius: 0, paddingBottom: 20 }}>
            <Head title="Project Detail" />
            <Row justify={'space-between'} align={'middle'} style={{ marginBottom: 20, marginTop: 5 }}>
                <Col>
                    <span className='page-title'>{project.name}</span>
                </Col>
                <Col>
                    <Space size="middle">
                        <Button shape="circle" icon={<ArrowLeftOutlined />} size={"large"} onClick={handleBack} />
                        <Button style={{ color: "blue", borderColor: "blue" }} shape="circle" icon={<PlusOutlined />} size={"middle"} onClick={handleAdd} />
                    </Space>
                </Col>
            </Row>

            <div className='table-holder'>
                <Table columns={columns} dataSource={data} rowKey={(key) => key.id} loading={loading} pagination={{ defaultPageSize: 50 }} />
            </div>
        </Card>
    );
};

Index.layout = page => <AgentLayout children={page} />

export default Index;
import React, { useRef, useEffect, useState } from 'react';
import AgentLayout from '@/Layouts/AgentLayout';
import { Head, usePage, router, Link } from "@inertiajs/react";
import { Button, Col, Row, Space, Table, Popconfirm, message, Tooltip, Card } from 'antd';
import { PlusOutlined, ArrowLeftOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const Index = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();

    const { project, results, lang } = usePage().props;

    useEffect(() => {
        setData(results);
        setLoading(false);
    }, []);

    const handleBack = () => {
        router.get('/project')
    }

    const handleAdd = () => {
        router.get(`/project/doc/addEdit?id=${0}&pid=${project.id}`)
    }

    const handleEdit = (id) => {
        router.get(`/project/doc/addEdit?id=${id}&pid=${project.id}`)
    }

    const handleDelete = (id) => {
        const formData = {
            id: id,
            project_id: project.id
        };
        router.post('/project/doc/delete', formData, {
            onSuccess: () => {
                message.success(lang.com.data_deleted);
            },
            onFinish: () => {
                router.get(`/project/doc?pid=${project.id}`)
            }
        })
    };

    const handleCancel = () => {
        message.error(lang.com.operation_cancelled);
    };

    const columns = [
        {
            title: lang.com.document_type,
            dataIndex: "doc_type",
            key: 'doc_type',
            width: '20%'
        },
        {
            title: lang.com.link,
            key: 'link',
            width: 'auto',
            render: (_, record) => (
                <a href={record.link} target='_blank'>{record.link}</a>
            )
        },
        {
            title: '',
            key: 'action',
            width: '8%',
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title={lang.com.edit_row} color="orange">
                        <Button style={{ color: "orange", borderColor: "orange" }} size="middle" shape="circle" icon={<EditOutlined />} onClick={() => handleEdit(record.id)} />
                    </Tooltip>
                    <Popconfirm
                        title={lang.com.delete}
                        description={lang.com.are_you_sure_to_delete}
                        onConfirm={() => handleDelete(record.id)}
                        onCancel={handleCancel}
                        okText={lang.com.yes}
                        cancelText={lang.com.no}
                    >
                        <Tooltip title={lang.com.delete_row} color="red">
                            <Button danger size="middle" shape="circle" icon={<DeleteOutlined />} />
                        </Tooltip>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <Card bordered={false} style={{ width: "100%", borderRadius: 0, paddingBottom: 20 }}>
            <Head title={lang.com.project_documents} />
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
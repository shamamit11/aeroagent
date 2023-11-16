import React, { useRef, useEffect, useState } from 'react';
import AgentLayout from '@/Layouts/AgentLayout';
import { Head, usePage, router } from "@inertiajs/react";
import { Button, Col, Input, Row, Space, Table, Tooltip, Card, Badge, Popconfirm } from 'antd';
import { SearchOutlined, EyeOutlined, EditOutlined, DeleteOutlined  } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

import "./style.scss";

const Request = () => {
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [data, setData] = useState();

    const { results } = usePage().props;

    useEffect(() => {
        setData(results);
        setLoading(false);
    }, []);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const handleAdd = () => {
        router.get('/tenant/addEdit')
    }

    const handleImport = () => {
        router.get('/tenant/import')
    }

    const handleDetail = (id) => {
        router.get(`/tenant/detail?id=${id}`)
    }

    const handleEdit = (id) => {
        router.get(`/tenant/addEdit?id=${id}`)
    }

    const handleDelete = (id) => {
        const formData = {
            id: id
        };
        router.post('/tenant/delete', formData, {
            onSuccess: () => {
                message.success('Data Deleted Successfully !');
            },
            onFinish: () => {
                router.get(`/tenant`)
            }
        })
    };

    const handleCancel = () => {
        message.error('Operation Cancelled !');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (text)
    });

    const columns = [
        {
            title: 'Customer Name',
            dataIndex: 'customer_name',
            key: 'customer_name',
            width: 'auto',
            ...getColumnSearchProps('customer_name'),
        },
        {
            title: 'Request Type',
            dataIndex: 'request_type',
            key: 'request_type',
            width: '15%',
            ...getColumnSearchProps('request_type'),
        },
        {
            title: 'Property',
            dataIndex: 'property',
            key: 'property',
            width: '15%',
            ...getColumnSearchProps('property'),
        },
        {
            title: 'Property Type',
            dataIndex: 'property_type',
            key: 'property_type',
            width: '13%',
            ...getColumnSearchProps('property_type'),
        },
        {
            title: 'Status',
            key: 'status',
            width: '12%',
            align: 'center',
            ...getColumnSearchProps('status'),
            render: (_, record) => (
                <Badge color={record.status_color} count={record.status} />
            ),
        },
        {
            title: '',
            key: 'action',
            width: '13%',
            align: "center",
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title="View Detail" color="blue">
                        <Button style={{ color: "blue", borderColor: "blue" }} size="middle" shape="circle" icon={<EyeOutlined />} onClick={() => handleDetail(record.id)} />
                    </Tooltip>
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
        <>
            <Head title="Tenant Requests" />
            <Card bordered={false} style={{ width: "100%", borderRadius: 0, paddingBottom: 20 }}>
                <Row justify={'space-between'} align={'middle'} style={{marginBottom: 20, marginTop: 5}}>
                    <Col>
                        <span className='page-title'>Tenant Requests</span>
                    </Col>
                </Row>

                <div className='table-holder'>
                    <Table columns={columns} dataSource={data} rowKey={(key) => key.id} loading={loading} pagination={{ defaultPageSize: 50 }} />
                </div>
            </Card>
        </>
    );
};

Request.layout = page => <AgentLayout children={page} />

export default Request;
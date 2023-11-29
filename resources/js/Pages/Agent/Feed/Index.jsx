import React, { useRef, useEffect, useState } from 'react';
import AgentLayout from '@/Layouts/AgentLayout';
import { Head, usePage, router } from "@inertiajs/react";
import { Button, Col, Input, Row, Space, Table, Tooltip, Card, Popconfirm } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined  } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

const Index = () => {
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
        router.get('/feed/addEdit')
    }

    const handleEdit = (id) => {
        router.get(`/feed/addEdit?id=${id}`)
    }

    const handleDelete = (id) => {
        const formData = {
            id: id
        };
        router.post('/feed/delete', formData, {
            onSuccess: () => {
                message.success('Data Deleted Successfully !');
            },
            onFinish: () => {
                router.get(`/feed`)
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
            title: 'Looking For',
            dataIndex: 'looking_for',
            key: 'looking_for',
            width: '15%',
            ...getColumnSearchProps('looking_for'),
        },
        {
            title: 'Property',
            dataIndex: 'property',
            key: 'property',
            width: '12%',
            ...getColumnSearchProps('property'),
        },
        {
            title: 'Property Type',
            dataIndex: 'property_type',
            key: 'property_type',
            width: '12%',
            ...getColumnSearchProps('property_type'),
        },
        {
            title: 'Budget',
            dataIndex: 'budget',
            key: 'budget',
            width: '12%',
            ...getColumnSearchProps('budget'),
        },
        {
            title: 'Time to Close',
            dataIndex: 'time_to_close',
            key: 'time_to_close',
            width: '15%',
            ...getColumnSearchProps('time_to_close'),
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
            width: 'auto',
            ...getColumnSearchProps('location'),
        },
        {
            title: '',
            key: 'action',
            width: '10%',
            align: "center",
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
        <>
            <Head title="My Feed" />
            <Card bordered={false} style={{ width: "100%", borderRadius: 0, paddingBottom: 20 }}>
                <Row justify={'space-between'} align={'middle'} style={{marginBottom: 20, marginTop: 5}}>
                    <Col>
                        <span className='page-title'>My Feed</span>
                    </Col>
                    <Col>
                        <Space size={"middle"}>
                            <Button style={{ color: "blue", borderColor: "blue" }} shape="circle" icon={<PlusOutlined />} size={"middle"} onClick={handleAdd} />
                        </Space>
                    </Col>
                </Row>

                <div className='table-holder'>
                    <Table columns={columns} dataSource={data} rowKey={(key) => key.id} loading={loading} pagination={{ defaultPageSize: 50 }} />
                </div>
            </Card>
        </>
    );
};

Index.layout = page => <AgentLayout children={page} />

export default Index;
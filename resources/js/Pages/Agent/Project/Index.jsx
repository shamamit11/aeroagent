import React, { useRef, useEffect, useState } from 'react';
import AgentLayout from '@/Layouts/AgentLayout';
import { Head, usePage, router, Link } from "@inertiajs/react";
import { Button, Col, Input, Row, Space, Table, Popconfirm, message, Tooltip, Card } from 'antd';
import { PlusOutlined, SearchOutlined, OrderedListOutlined, FolderOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
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
        router.get('/project/addEdit')
    }

    const handleEdit = (id) => {
        router.get(`/project/addEdit?id=${id}`)
    }

    const handleDetail = (id) => {
        router.get(`/project/detail?pid=${id}`)
    }

    const handleDoc = (id) => {
        router.get(`/project/doc?pid=${id}`)
    }

    const handleDelete = (id) => {
        const formData = {
            id: id
        };
        router.post('/project/delete', formData, {
            onSuccess: () => {
                message.success('Data Deleted Successfully !');
            },
            onFinish: () => {
                router.get('/project')
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
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 'auto',
            ...getColumnSearchProps('name'),
            render: (_, record) => (
                <Link title='View' href="/project/view" method="get" data={{ id: record.id }}>{record.name}</Link>
            )
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
            width: '15%',
            ...getColumnSearchProps('location'),
        },
        {
            title: 'Developer',
            dataIndex: 'developer',
            key: 'developer',
            width: '15%',
            ...getColumnSearchProps('developer'),
        },
        {
            title: 'Commission (%)',
            dataIndex: 'commission',
            key: 'commission',
            width: '12%',
            ...getColumnSearchProps('commission'),
        },
        {
            title: 'Status',
            dataIndex: 'project_status',
            key: 'project_status',
            width: '10%',
            ...getColumnSearchProps('project_status'),
        },
        {
            title: '',
            key: 'action',
            width: '12%',
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title="Units" color="blue">
                        <Button style={{ color: "blue", borderColor: "blue" }} size="middle" shape="circle" icon={<OrderedListOutlined />} onClick={() => handleDetail(record.id)} />
                    </Tooltip>
                    <Tooltip title="Documents" color="green">
                        <Button style={{ color: "green", borderColor: "green" }} size="middle" shape="circle" icon={<FolderOutlined />} onClick={() => handleDoc(record.id)} />
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
        <Card bordered={false} style={{ width: "100%", borderRadius: 0, paddingBottom: 20 }}>
            <Head title="Projects" />
            <Row justify={'space-between'} align={'middle'} style={{marginBottom: 20, marginTop: 5}}>
                <Col>
                    <h1 className='page-title'>Projects</h1>
                </Col>
                <Col>
                    <Button style={{ color: "blue", borderColor: "blue" }} shape="circle" icon={<PlusOutlined />} size={"middle"} onClick={handleAdd} />
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
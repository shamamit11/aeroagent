import React, { useRef, useEffect, useState } from 'react';
import AgentLayout from '@/Layouts/AgentLayout';
import { Head, usePage, router } from "@inertiajs/react";
import { Button, Col, Input, Row, Space, Table, Tooltip, Card, Badge, Popconfirm } from 'antd';
import { SearchOutlined, EyeOutlined, DeleteOutlined, EditOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

const ListPage = () => {
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [data, setData] = useState();

    const { location_name, results } = usePage().props;

    console.log(usePage().props);

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

    const handleDetail = (id) => {
        router.get(`/leaser/detail?id=${id}`)
    }

    const handleEdit = (id) => {
        router.get(`/leaser/addEdit?id=${id}`)
    }

    const handleDelete = (id, lid) => {
        const formData = {
            id: id
        };
        router.post('/leaser/delete', formData, {
            onSuccess: () => {
                message.success('Data Deleted Successfully !');
            },
            onFinish: () => {
                router.get(`/leaser/list?lid=${lid}`)
            }
        })
    };

    const handleCancel = () => {
        message.error('Operation Cancelled !');
    };

    const handleBack = () => {
        router.get('/leaser')
    }

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
            title: 'Mobile',
            dataIndex: 'customer_mobile',
            key: 'customer_mobile',
            width: '18%',
            ...getColumnSearchProps('customer_mobile'),
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
            width: '10%',
            align: 'center',
            ...getColumnSearchProps('status'),
            render: (_, record) => (
                <Badge color={record.status_color} count={record.status} />
            )
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
                        onConfirm={() => handleDelete(record.id, record.location_id)}
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
            <Head title="Leasers" />
            <Card bordered={false} style={{ width: "100%", borderRadius: 0, paddingBottom: 20 }}>
                <Row justify={'space-between'} align={'middle'} style={{ marginBottom: 20, marginTop: 5 }}>
                    <Col>
                        <span className='page-title'>Leasers - {location_name}</span>
                    </Col>
                    <Col>
                        <Button shape="circle" icon={<ArrowLeftOutlined />} size={"middle"} onClick={handleBack} />
                    </Col>
                </Row>

                <div className='table-holder'>
                    <Table columns={columns} dataSource={data} rowKey={(key) => key.id} loading={loading} pagination={{ defaultPageSize: 50 }} />
                </div>
            </Card>
        </>
    );
};

ListPage.layout = page => <AgentLayout children={page} />

export default ListPage;
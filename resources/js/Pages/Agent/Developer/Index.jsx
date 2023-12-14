import React, { useRef, useEffect, useState } from 'react';
import AgentLayout from '@/Layouts/AgentLayout';
import { Head, usePage, router } from "@inertiajs/react";
import { Button, Col, Input, Row, Space, Table, Popconfirm, message, Tooltip, Card } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

const Index = () => {
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [data, setData] = useState();

    const { results, lang } = usePage().props;

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
        router.get('/developer/addEdit')
    }

    const handleEdit = (id) => {
        router.get(`/developer/addEdit/?id=${id}`)
    }

    const handleDelete = (id) => {
        const formData = {
            id: id
        };
        router.post('/developer/delete', formData, {
            onSuccess: () => {
                message.success(lang.com.data_deleted);
            },
            onFinish: () => {
                router.get('/developer')
            }
        })
    };

    const handleCancel = () => {
        message.error(lang.com.operation_cancelled);
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
                    // placeholder={`Search ${dataIndex}`}
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
                        {lang.com.search}
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        {lang.com.reset}
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
            title: lang.com.name,
            dataIndex: 'name',
            key: 'name',
            width: 'auto',
            ...getColumnSearchProps('name'),
        },
        {
            title: lang.com.city,
            dataIndex: 'city',
            key: 'city',
            width: '15%',
            ...getColumnSearchProps('city'),
        },
        {
            title: lang.com.country,
            dataIndex: 'country',
            key: 'country',
            width: '20%',
            ...getColumnSearchProps('country'),
            sorter: (a, b) => a.address.length - b.address.length,
            sortDirections: ['descend', 'ascend'],
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

            <Head title={lang.com.developers} />
            <Row justify={'space-between'} align={'middle'} style={{marginBottom: 20, marginTop: 5}}>
                <Col>
                    <span className='page-title'>{lang.com.developers}</span>
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
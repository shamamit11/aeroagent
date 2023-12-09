import React, { useRef, useEffect, useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, usePage, router } from "@inertiajs/react";
import { Button, Col, Input, Row, Space, Table, Popconfirm, message } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
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
        router.get('/admin/amenity/addEdit')
    }

    const handleEdit = (id) => {
        router.get(`/admin/amenity/addEdit/?id=${id}`)
    }

    const handleDelete = (id) => {
        const formData = {
            id: id
        };
        router.post('/admin/amenity/delete', formData, {
            onSuccess: () => {
                message.success(lang.com.data_deleted);
            },
            onFinish: () => {
                router.get('/admin/amenity')
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
                    //placeholder={`Search ${dataIndex}`}
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
            title: "Name (Arabic)",
            dataIndex: 'ar_name',
            key: 'ar_name',
            width: '20%',
            align: 'right',
            ...getColumnSearchProps('ar_name'),
        },
        {
            title: '',
            key: 'action',
            width: '12%',
            render: (_, record) => (
                <Space size="middle">
                    <Button size="middle" onClick={() => handleEdit(record.id)}>Edit</Button>
                    <Popconfirm
                        title={lang.com.delete}
                        description={lang.com.are_you_sure_to_delete}
                        onConfirm={() => handleDelete(record.id)}
                        onCancel={handleCancel}
                        okText={lang.com.yes}
                        cancelText={lang.com.no}
                    >
                        <Button danger size="middle">Delete</Button>
                    </Popconfirm>

                </Space>
            ),
        },
    ];

    return (
        <>
            <Head title="Amenities" />
            <Row justify={'space-between'} align={'middle'}>
                <Col>
                    <h1 className='page-title'>Amenities</h1>
                </Col>
                <Col>
                    <Button type="primary" shape="circle" icon={<PlusOutlined />} size={"large"} onClick={handleAdd} />
                </Col>
            </Row>

            <div className='table-holder'>
                <Table columns={columns} dataSource={data} rowKey={(key) => key.id} loading={loading} pagination={{ defaultPageSize: 50 }} />
            </div>
        </>
    );
};

Index.layout = page => <AdminLayout children={page} />

export default Index;
import React, { useRef, useEffect, useState } from 'react';
import AgentLayout from '@/Layouts/AgentLayout';
import { Head, usePage, router } from "@inertiajs/react";
import { Button, Col, Input, Row, Space, Table, Tooltip, Card, Badge } from 'antd';
import { SearchOutlined, EyeOutlined, EditOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { getObjectValue } from '@/utils';

const StockList = () => {
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [data, setData] = useState();

    const { location_name, results, property_name, lang } = usePage().props;

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
        router.get(`/seller/detail?id=${id}`)
    }

    const handleEdit = (id) => {
        router.get(`/seller/addEdit?id=${id}`)
    }

    const handleBack = () => {
        router.get('/seller')
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
            title: lang.com.customer_name,
            dataIndex: 'customer_name',
            key: 'customer_name',
            width: 'auto',
            ...getColumnSearchProps('customer_name'),
        },
        {
            title: lang.com.mobile,
            dataIndex: 'customer_mobile',
            key: 'customer_mobile',
            width: '18%',
            ...getColumnSearchProps('customer_mobile'),
        },
        {
            title: lang.com.property,
            dataIndex: 'property_name',
            key: 'property_name',
            width: '15%',
            ...getColumnSearchProps('property_name'),
        },
        {
            title: lang.com.property_type,
            dataIndex: 'property_type_name',
            key: 'property_type',
            width: '13%',
            ...getColumnSearchProps('property_type_name'),
        },
        {
            title: lang.com.status,
            key: 'status',
            width: '10%',
            align: 'center',
            ...getColumnSearchProps('status'),
            render: (_, record) => (
                <Badge color={record.status_color} count={getObjectValue(lang, "com", record.status)} />
            )
        },
        {
            title: '',
            key: 'action',
            width: '13%',
            align: "center",
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title={lang.com.view_detail} color="blue">
                        <Button style={{ color: "blue", borderColor: "blue" }} size="middle" shape="circle" icon={<EyeOutlined />} onClick={() => handleDetail(record.id)} />
                    </Tooltip>
                    <Tooltip title={lang.com.edit_row} color="orange">
                        <Button style={{ color: "orange", borderColor: "orange" }} size="middle" shape="circle" icon={<EditOutlined />} onClick={() => handleEdit(record.id)} />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Head title={lang.com.seller_stocks} />
            <Card bordered={false} style={{ width: "100%", borderRadius: 0, paddingBottom: 20 }}>
                <Row justify={'space-between'} align={'middle'} style={{ marginBottom: 20, marginTop: 5 }}>
                    <Col>
                        <span className='page-title'>{getObjectValue(lang, "com", property_name)} - {location_name}</span>
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

StockList.layout = page => <AgentLayout children={page} />

export default StockList;
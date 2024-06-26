import React, { useRef, useEffect, useState } from 'react';
import AgentLayout from '@/Layouts/AgentLayout';
import { Head, usePage, router } from "@inertiajs/react";
import { Button, Col, Input, Row, Space, Table, Tooltip, Card, Popconfirm } from 'antd';
import { SearchOutlined, EyeOutlined, DeleteOutlined  } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { getObjectValue } from '@/utils';

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

    const handleDetail = (customer_type, source_id) => {
        console.log(customer_type, source_id);
        if(customer_type == "seller") {
            router.get(`/seller/detail?id=${source_id}`)
        }
        if(customer_type == "buyer") {
            router.get(`/buyer/detail?id=${source_id}`)
        }
        if(customer_type == "leaser") {
            router.get(`/leaser/detail?id=${source_id}`)
        }
        if(customer_type == "tenant") {
            router.get(`/tenant/detail?id=${source_id}`)
        }
    }

    const handleDelete = (id) => {
        const formData = {
            id: id
        };
        router.post('/followup/delete', formData, {
            onSuccess: () => {
                message.success(lang.com.data_deleted);
            },
            onFinish: () => {
                router.get(`/followup`)
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
            title: lang.com.customer_name,
            dataIndex: 'customer_name',
            key: 'customer_name',
            width: '18%',
            ...getColumnSearchProps('customer_name'),
        },
        {
            title: lang.com.follow_up_date,
            dataIndex: 'date',
            key: 'date',
            width: '15%',
            ...getColumnSearchProps('date'),
        },
        {
            title: lang.com.follow_up_time,
            dataIndex: 'time',
            key: 'time',
            width: '15%',
            ...getColumnSearchProps('time'),
        },
        {
            title: lang.com.list_type,
            //dataIndex: 'customer_type',
            key: 'customer_type',
            width: '13%',
            ...getColumnSearchProps('customer_type'),
            render: (_, record) => (
                <span>{getObjectValue(lang, "com", record.customer_type)}</span>
            )
        },
        {
            title: lang.com.note,
            dataIndex: 'note',
            key: 'note',
            width: 'auto',
        },
        {
            title: '',
            key: 'action',
            width: '10%',
            align: "center",
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title={lang.com.view_detail} color="blue">
                        <Button style={{ color: "blue", borderColor: "blue" }} size="middle" shape="circle" icon={<EyeOutlined />} onClick={() => handleDetail(record.customer_type, record.source_id)} />
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
        <>
            <Head title={lang.com.follow_ups} />
            <Card bordered={false} style={{ width: "100%", borderRadius: 0, paddingBottom: 20 }}>
                <Row justify={'space-between'} align={'middle'} style={{marginBottom: 20, marginTop: 5}}>
                    <Col>
                        <span className='page-title'>{lang.com.follow_ups}</span>
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
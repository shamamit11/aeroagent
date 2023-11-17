import React, { useRef, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, usePage, router } from "@inertiajs/react";
import { Button, Col, Input, Row, Space, Table, Tooltip, Badge, DatePicker } from 'antd';
import { SearchOutlined, CheckOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

import "./style.scss";

const Index = () => {
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [data, setData] = useState();

    const { results, paydate } = usePage().props;

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

    const onDateChange = (date, dateString) => {
        router.get(`/admin/payout?pay_date=${dateString}`)
    };

    const handlePayment = (object) => {
        console.log(object);

        router.post('/admin/payout/store', object, {
            onSuccess: () => {
                message.success('Payout Created Successfully !')
            },
            onError: () => {
                message.error('There was an error processing your request. Please try again !')
            },
            onFinish: () => {
                router.get('/admin/payout')
            }
        });
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
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'IBAN',
            dataIndex: 'iban',
            key: 'iban',
            width: '20%',
        },
        {
            title: 'Payout Range',
            key: 'pay_range',
            width: '20%',
            render: (_, record) => (
                <span>{record.pay_date_from} - {record.pay_date_to}</span>
            )
        },
        {
            title: 'Wallet Balance (AED)',
            dataIndex: 'wallet_balance',
            key: 'wallet_balance',
            width: '20%',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: '10%',
            align: "center",
            ...getColumnSearchProps('status'),
            render: (_, record) => (
                <Badge count={record.status} color={record.status_color} />
            )
        },
        {
            title: '',
            key: 'action',
            width: '8%',
            align: "center",
            render: (_, record) => (
                <>
                    {record.status == 'Not Paid' && (
                        <Space size="middle">
                            <Tooltip title="Mark as Paid" color="green">
                                <Button type='primary' size="small" shape="circle" icon={<CheckOutlined />} onClick={() => handlePayment(record)} />
                            </Tooltip>
                        </Space>
                    )}

                    {record.status == 'Paid' && (
                        <Space size="middle">
                            <Tooltip title="Mark as Paid" color="red">
                                <Button size="small" shape="circle" icon={<CheckOutlined />} disabled/>
                            </Tooltip>
                        </Space>
                    )}
                </>

            ),
        },
    ];

    return (
        <>
            <Head title="Payouts" />
            <Row justify={'space-between'} align={'middle'}>
                <Col>
                    <span className='page-title'>Payouts for {paydate}</span>
                </Col>
                <Col>
                    <Space size="middle">
                        <span>Select Date:</span>
                        <DatePicker defaultValue={dayjs(paydate)} onChange={onDateChange} />
                    </Space>
                </Col>
            </Row>

            <div className='table-holder'>
                <Table columns={columns} dataSource={data} rowKey={(key) => key.id} loading={loading} pagination={{ defaultPageSize: 200 }} />
            </div>
        </>
    );
};

Index.layout = page => <AdminLayout children={page} />

export default Index;
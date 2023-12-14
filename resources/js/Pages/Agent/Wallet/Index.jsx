import React, { useRef, useEffect, useState } from 'react';
import AgentLayout from '@/Layouts/AgentLayout';
import { Head, usePage } from "@inertiajs/react";
import { Button, Col, Input, Row, Space, Table, Statistic, Card } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

const Index = () => {
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [data, setData] = useState();
    const searchInput = useRef(null);

    const { results, balance, totalReferral, totalPayout, totalRenewal, lang } = usePage().props;

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
            title: lang.com.date,
            dataIndex: 'date',
            key: 'date',
            width: '12%',
            ...getColumnSearchProps('date'),
        },
        {
            title: lang.com.transaction + ' #',
            dataIndex: 'transaction_id',
            key: 'transaction_id',
            width: '25%',
            ...getColumnSearchProps('transaction_id')
        },
        {
            title: lang.com.type,
            dataIndex: 'type',
            key: 'type',
            width: '15%',
            ...getColumnSearchProps('type')
        },
        {
            title: lang.com.amount + ' (AED)',
            dataIndex: 'amount',
            key: 'amount',
            width: '15%'
        },
        {
            title: lang.com.note,
            dataIndex: 'note',
            key: 'note',
            width: 'auto',
        }
    ];

    return (
        <>
            <Head title={lang.com.my_wallet} />
            <Row justify={'space-between'} align={'middle'} style={{marginBottom: 20}}>
                <Col>
                    <span className='page-title'>{lang.com.my_wallet}</span>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={6}>
                    <Card bordered={false}>
                        <Statistic
                            title={lang.com.available_balance + ' (AED)'}
                            value={balance}
                            precision={2}
                            valueStyle={{
                                color: '#3f8600',
                            }}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={false}>
                        <Statistic
                            title={lang.com.total_referrals + ' (AED)'}
                            value={totalReferral}
                            precision={2}
                            valueStyle={{
                                color: 'skyblue',
                            }}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={false}>
                        <Statistic
                            title={lang.com.total_payout + ' (AED)'}
                            value={totalPayout}
                            precision={2}
                            valueStyle={{
                                color: 'orange',
                            }}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={false}>
                        <Statistic
                            title={lang.com.total_renewal + ' (AED)'}
                            value={totalRenewal}
                            precision={2}
                            valueStyle={{
                                color: '#cf1322',
                            }}
                        />
                    </Card>
                </Col>
            </Row>

            <div className='table-holder'>
                <Table columns={columns} dataSource={data} rowKey={(key) => key.id} loading={loading} pagination={{ defaultPageSize: 50 }} />
            </div>
        </>
    );
};

Index.layout = page => <AgentLayout children={page} />

export default Index;
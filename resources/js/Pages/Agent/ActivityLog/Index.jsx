import React, { useRef, useEffect, useState } from 'react';
import AgentLayout from '@/Layouts/AgentLayout';
import { Head, usePage } from "@inertiajs/react";
import { Button, Col, Input, Row, Space, Table, Tooltip, Card, Modal, Divider } from 'antd';
import { SearchOutlined, EyeOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

const Index = () => {
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [data, setData] = useState();

    const [detail, setDetail] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const handleDetail = (record) => {
        console.log(record);
        setDetail(record);
        setIsModalOpen(true);
    }

    const handleModalCancel = () => {
        setIsModalOpen(false);
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
            dataIndex: 'updated_at',
            key: 'updated_at',
            width: '18%',
            ...getColumnSearchProps('updated_at'),
        },
        {
            title: lang.com.event,
            dataIndex: 'event',
            key: 'event',
            width: '15%',
            ...getColumnSearchProps('event'),
        },
        {
            title: lang.com.properties,
            dataIndex: 'properties',
            key: 'properties',
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
                        <Button style={{ color: "blue", borderColor: "blue" }} size="middle" shape="circle" icon={<EyeOutlined />} onClick={() => handleDetail(record)} />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Head title={lang.com.activity_log} />
            <Card bordered={false} style={{ width: "100%", borderRadius: 0, paddingBottom: 20 }}>
                <Row justify={'space-between'} align={'middle'} style={{ marginBottom: 20, marginTop: 5 }}>
                    <Col>
                        <span className='page-title'>{lang.com.activity_log}</span>
                    </Col>
                </Row>

                <div className='table-holder'>
                    <Table columns={columns} dataSource={data} rowKey={(key) => key.id} loading={loading} pagination={{ defaultPageSize: 50 }} />
                </div>
            </Card>

            <Modal title={lang.com.view_detail} open={isModalOpen} onCancel={handleModalCancel} footer={null} width={900}>
                <Space size={"small"}>
                    <span style={{ fontWeight: 600 }}>{lang.com.created_at} :</span>
                    <span>{detail.created_at}</span>
                </Space>
                <Divider />
                <Space size={"small"}>
                    <span style={{ fontWeight: 600 }}>{lang.com.updated_at} :</span>
                    <span>{detail.updated_at}</span>
                </Space>
                <Divider />
                <Space size={"small"}>
                    <span style={{ fontWeight: 600 }}>{lang.com.event} :</span>
                    <span>{detail.event}</span>
                </Space>
                <Divider />

                <pre>{detail.all_properties} </pre>
                
            </Modal>

        </>
    );
};

Index.layout = page => <AgentLayout children={page} />

export default Index;
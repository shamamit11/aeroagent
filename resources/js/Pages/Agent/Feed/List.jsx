import React, { useRef, useEffect, useState } from 'react';
import AgentLayout from '@/Layouts/AgentLayout';
import { Head, usePage, router } from "@inertiajs/react";
import { Button, Col, Input, Row, Space, Table, Tooltip, Card, Modal, Divider } from 'antd';
import { ReloadOutlined, SearchOutlined, EyeOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

import { getObjectValue } from '@/utils';

const List = () => {
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [data, setData] = useState();
    const [selectedRecord, setSelectedRecord] = useState();

    const { results, lang } = usePage().props;

    useEffect(() => {
        setData(results);
        setLoading(false);

        const fetchData = () => {
            router.get('/feed/list')
        };

        const intervalId = setInterval(fetchData, 30000);
        return () => clearInterval(intervalId);

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

    const handleReload = () => {
        router.get('/feed/list')
    }

    const handleMyList = () => {
        router.get('/feed')
    }

    const handleDetail = (record) => {
        setSelectedRecord(record);
        setModalVisible(true);
    }

    const handleModalCancel = () => {
        setModalVisible(false);
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
            title: lang.com.looking_for,
            key: 'looking_for',
            width: '15%',
            ...getColumnSearchProps('looking_for'),
            render: (_, record) => (
                <span>
                    {getObjectValue(lang, 'com', record.looking_for)}
                </span>
            )
        },
        {
            title: lang.com.property,
            dataIndex: 'property',
            key: 'property',
            width: '12%',
            ...getColumnSearchProps('property'),
        },
        {
            title: lang.com.property_type,
            dataIndex: 'property_type',
            key: 'property_type',
            width: '12%',
            ...getColumnSearchProps('property_type'),
        },
        {
            title: lang.com.budget,
            dataIndex: 'budget',
            key: 'budget',
            width: '12%',
            ...getColumnSearchProps('budget'),
        },
        {
            title: lang.com.time_to_close,
            dataIndex: 'time_to_close',
            key: 'time_to_close',
            width: '15%',
            ...getColumnSearchProps('time_to_close'),
        },
        {
            title: lang.com.locations,
            dataIndex: 'location',
            key: 'location',
            width: 'auto',
            ...getColumnSearchProps('location'),
        },
        {
            title: '',
            key: 'action',
            width: '8%',
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
            <Head title={lang.com.feed} />
            <Card bordered={false} style={{ width: "100%", borderRadius: 0, paddingBottom: 20 }}>
                <Row justify={'space-between'} align={'middle'} style={{ marginBottom: 20, marginTop: 5 }}>
                    <Col>
                        <span className='page-title'>{lang.com.feed}</span>
                    </Col>
                    <Col>
                        <Space size={"middle"}>
                            <Button style={{ color: "blue", borderColor: "blue" }} shape="circle" icon={<ReloadOutlined />} size={"middle"} onClick={handleReload} />
                            <Button style={{ color: "green", borderColor: "green" }} size={"middle"} onClick={handleMyList}> { lang.com.my_feed }</Button>
                        </Space>
                    </Col>
                </Row>

                <div className='table-holder'>
                    <Table columns={columns} dataSource={data} rowKey={(key) => key.id} loading={loading} pagination={{ defaultPageSize: 50 }} />
                </div>
            </Card>

            <Modal title={lang.com.feed_detail} open={modalVisible} onCancel={handleModalCancel} footer={null} width={600}>
                <Row justify={'space-between'} align={'middle'}>
                    <Col>
                        <span style={{ fontWeight: 600 }}>{lang.com.posted_by} :</span>
                    </Col>
                    <Col>
                        <span>{selectedRecord?.user_name}</span>
                    </Col>
                </Row>
                <Divider />

                <Row justify={'space-between'} align={'middle'}>
                    <Col>
                        <span style={{ fontWeight: 600 }}>{lang.com.contact_number} :</span>
                    </Col>
                    <Col>
                        <span>{selectedRecord?.user_mobile}</span>
                    </Col>
                </Row>
                <Divider />

                <Row justify={'space-between'} align={'middle'}>
                    <Col>
                        <span style={{ fontWeight: 600 }}>{lang.com.looking_for} :</span>
                    </Col>
                    <Col>
                        {/* <span>{selectedRecord?.looking_for}</span> */}
                        <span>{getObjectValue(lang, "com", selectedRecord?.looking_for)}</span>
                    </Col>
                </Row>
                <Divider />

                <Row justify={'space-between'} align={'middle'}>
                    <Col>
                        <span style={{ fontWeight: 600 }}>{lang.com.property} :</span>
                    </Col>
                    <Col>
                        <span>{selectedRecord?.property} / {selectedRecord?.property_type}</span>
                    </Col>
                </Row>
                <Divider />

                <Row justify={'space-between'} align={'middle'}>
                    <Col>
                        <span style={{ fontWeight: 600 }}>{lang.com.market} :</span>
                    </Col>
                    <Col>
                        {/* <span>{selectedRecord?.market}</span> */}
                        <span>{getObjectValue(lang, "com", selectedRecord?.market)}</span>
                    </Col>
                </Row>
                <Divider />

                {selectedRecord?.project_name && (
                    <>
                        <Row justify={'space-between'} align={'middle'}>
                            <Col>
                                <span style={{ fontWeight: 600 }}>{lang.com.project} :</span>
                            </Col>
                            <Col>
                                <span>{selectedRecord?.project_name}</span>
                            </Col>
                        </Row>
                        <Divider />
                    </>
                )}

                <Row justify={'space-between'} align={'middle'}>
                    <Col>
                        <span style={{ fontWeight: 600 }}>{lang.com.locations} :</span>
                    </Col>
                    <Col>
                        <span>{selectedRecord?.location}</span>
                    </Col>
                </Row>
                <Divider />

                <Row justify={'space-between'} align={'middle'}>
                    <Col>
                        <span style={{ fontWeight: 600 }}>{lang.com.property_size} :</span>
                    </Col>
                    <Col>
                        <span>{selectedRecord?.property_size}</span>
                    </Col>
                </Row>
                <Divider />

                <Row justify={'space-between'} align={'middle'}>
                    <Col>
                        <span style={{ fontWeight: 600 }}>{lang.com.budget} :</span>
                    </Col>
                    <Col>
                        <span>AED {selectedRecord?.budget}</span>
                    </Col>
                </Row>
                <Divider />

                <Row justify={'space-between'} align={'middle'}>
                    <Col>
                        <span style={{ fontWeight: 600 }}>{lang.com.time_to_close} :</span>
                    </Col>
                    <Col>
                        <span>{selectedRecord?.time_to_close} {lang.com.days}</span>
                    </Col>
                </Row>
                <Divider />

                <Row justify={'space-between'} align={'middle'}>
                    <Col>
                        <span style={{ fontWeight: 600 }}>{lang.com.note} :</span>
                    </Col>
                    <Col>
                        <span>{selectedRecord?.note}</span>
                    </Col>
                </Row>
            </Modal>
        </>
    );
};

List.layout = page => <AgentLayout children={page} />

export default List;
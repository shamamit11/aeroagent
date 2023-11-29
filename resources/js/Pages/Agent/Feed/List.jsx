import React, { useRef, useEffect, useState } from 'react';
import AgentLayout from '@/Layouts/AgentLayout';
import { Head, usePage, router } from "@inertiajs/react";
import { Button, Col, Input, Row, Space, Table, Tooltip, Card, Modal, Divider } from 'antd';
import { ReloadOutlined, SearchOutlined, EyeOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

const List = () => {
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [data, setData] = useState();
    const [selectedRecord, setSelectedRecord] = useState();

    const { results } = usePage().props;

    useEffect(() => {
        setData(results);
        setLoading(false);

        const fetchData = () => {
            router.get('/feed/list')
        };

        const intervalId = setInterval(fetchData, 15000);

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
            title: 'Looking For',
            dataIndex: 'looking_for',
            key: 'looking_for',
            width: '15%',
            ...getColumnSearchProps('looking_for'),
        },
        {
            title: 'Property',
            dataIndex: 'property',
            key: 'property',
            width: '12%',
            ...getColumnSearchProps('property'),
        },
        {
            title: 'Property Type',
            dataIndex: 'property_type',
            key: 'property_type',
            width: '12%',
            ...getColumnSearchProps('property_type'),
        },
        {
            title: 'Budget',
            dataIndex: 'budget',
            key: 'budget',
            width: '12%',
            ...getColumnSearchProps('budget'),
        },
        {
            title: 'Time to Close',
            dataIndex: 'time_to_close',
            key: 'time_to_close',
            width: '15%',
            ...getColumnSearchProps('time_to_close'),
        },
        {
            title: 'Location',
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
                    <Tooltip title="View Detail" color="blue">
                        <Button style={{ color: "blue", borderColor: "blue" }} size="middle" shape="circle" icon={<EyeOutlined />} onClick={() => handleDetail(record)} />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Head title="Feed" />
            <Card bordered={false} style={{ width: "100%", borderRadius: 0, paddingBottom: 20 }}>
                <Row justify={'space-between'} align={'middle'} style={{ marginBottom: 20, marginTop: 5 }}>
                    <Col>
                        <span className='page-title'>Feed</span>
                    </Col>
                    <Col>
                        <Space size={"middle"}>
                            <Button style={{ color: "blue", borderColor: "blue" }} shape="circle" icon={<ReloadOutlined />} size={"middle"} onClick={handleReload} />
                            <Button style={{ color: "green", borderColor: "green" }} size={"middle"} onClick={handleMyList}> My Feed</Button>
                        </Space>
                    </Col>
                </Row>

                <div className='table-holder'>
                    <Table columns={columns} dataSource={data} rowKey={(key) => key.id} loading={loading} pagination={{ defaultPageSize: 50 }} />
                </div>
            </Card>

            <Modal title="Feed Detail" open={modalVisible} onCancel={handleModalCancel} footer={null} width={600}>
                <Row justify={'space-between'} align={'middle'}>
                    <Col>
                        <span style={{ fontWeight: 600 }}>Posted By:</span>
                    </Col>
                    <Col>
                        <span>{selectedRecord?.user_name}</span>
                    </Col>
                </Row>
                <Divider />

                <Row justify={'space-between'} align={'middle'}>
                    <Col>
                        <span style={{ fontWeight: 600 }}>Contact Number:</span>
                    </Col>
                    <Col>
                        <span>{selectedRecord?.user_mobile}</span>
                    </Col>
                </Row>
                <Divider />

                <Row justify={'space-between'} align={'middle'}>
                    <Col>
                        <span style={{ fontWeight: 600 }}>Looking For:</span>
                    </Col>
                    <Col>
                        <span>{selectedRecord?.looking_for}</span>
                    </Col>
                </Row>
                <Divider />

                <Row justify={'space-between'} align={'middle'}>
                    <Col>
                        <span style={{ fontWeight: 600 }}>Property:</span>
                    </Col>
                    <Col>
                        <span>{selectedRecord?.property} / {selectedRecord?.property_type}</span>
                    </Col>
                </Row>
                <Divider />

                <Row justify={'space-between'} align={'middle'}>
                    <Col>
                        <span style={{ fontWeight: 600 }}>Market:</span>
                    </Col>
                    <Col>
                        <span>{selectedRecord?.market}</span>
                    </Col>
                </Row>
                <Divider />

                {selectedRecord?.project_name && (
                    <>
                        <Row justify={'space-between'} align={'middle'}>
                            <Col>
                                <span style={{ fontWeight: 600 }}>Project:</span>
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
                        <span style={{ fontWeight: 600 }}>Location:</span>
                    </Col>
                    <Col>
                        <span>{selectedRecord?.location}</span>
                    </Col>
                </Row>
                <Divider />

                <Row justify={'space-between'} align={'middle'}>
                    <Col>
                        <span style={{ fontWeight: 600 }}>Property Size:</span>
                    </Col>
                    <Col>
                        <span>{selectedRecord?.property_size}</span>
                    </Col>
                </Row>
                <Divider />

                <Row justify={'space-between'} align={'middle'}>
                    <Col>
                        <span style={{ fontWeight: 600 }}>Budget:</span>
                    </Col>
                    <Col>
                        <span>AED {selectedRecord?.budget}</span>
                    </Col>
                </Row>
                <Divider />

                <Row justify={'space-between'} align={'middle'}>
                    <Col>
                        <span style={{ fontWeight: 600 }}>Time to Close:</span>
                    </Col>
                    <Col>
                        <span>{selectedRecord?.time_to_close} days</span>
                    </Col>
                </Row>
                <Divider />

                <Row justify={'space-between'} align={'middle'}>
                    <Col>
                        <span style={{ fontWeight: 600 }}>Note:</span>
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
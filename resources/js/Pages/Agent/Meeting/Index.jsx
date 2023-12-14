import React, { useRef, useEffect, useState } from 'react';
import AgentLayout from '@/Layouts/AgentLayout';
import { Head, usePage, useForm, router } from "@inertiajs/react";
import { Button, Col, Input, Row, Space, Table, Tooltip, Card, Badge, Popconfirm, Modal, message, Form, Select } from 'antd';
import { EditOutlined, SearchOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { getObjectValue } from '@/utils';

const Index = () => {
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [rowdata, setRowData] = useState();

    const props = usePage().props;
    const { lang } = usePage().props;
    const results = props.results;
    const statuses = props.statuses;

    useEffect(() => {
        setRowData(results);
        setLoading(false);
    }, []);

    const { data, setData, post, processing, errors } = useForm({
        id: null,
        status_id: null,
    });

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const handleModalCancel = () => {
        setIsModalOpen(false);
    };

    const handleModalOpen = (row_id) => {
        setData({ id: row_id });
        setIsModalOpen(true);
    }

    const handleDetail = (customer_type, source_id) => {
        if (customer_type == "seller") {
            router.get(`/seller/detail?id=${source_id}`)
        }
        if (customer_type == "buyer") {
            router.get(`/buyer/detail?id=${source_id}`)
        }
        if (customer_type == "leaser") {
            router.get(`/leaser/detail?id=${source_id}`)
        }
        if (customer_type == "tenant") {
            router.get(`/tenant/detail?id=${source_id}`)
        }
    }

    const handleDelete = (id) => {
        const formData = {
            id: id
        };
        router.post('/meeting/delete', formData, {
            onSuccess: () => {
                message.success(lang.com.data_deleted);
            },
            onFinish: () => {
                router.get(`/meeting`)
            }
        })
    };

    const handleCancel = () => {
        message.error(lang.com.operation_cancelled);
    };

    const submit = () => {
        post('/meeting/updateStatus', {
            onSuccess: () => {
                message.success(lang.com.status_updated)
            },
            onError: () => {
                message.error(lang.com.error_request)
                router.get(`/meeting`)
            },
            onFinish: () => {
                router.get(`/meeting`)
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
            title: lang.com.meeting_date,
            dataIndex: 'date',
            key: 'date',
            width: '15%',
            ...getColumnSearchProps('date'),
        },
        {
            title: lang.com.meeting_time,
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
            title: lang.com.status,
            key: 'status',
            width: '12%',
            align: 'center',
            ...getColumnSearchProps('status'),
            render: (_, record) => (
                <>
                    {record.status_color && (
                        <Badge color={record.status_color} count={getObjectValue(lang, "com", record.status)} />
                    )}
                    {!record.status_color && (
                        <span>{record.status}</span>
                    )}
                </>
            ),
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

                    {!record.status_id && (
                        <Tooltip title={lang.com.update_status} color="orange">
                            <Button style={{ color: "orange", borderColor: "orange" }} size="middle" shape="circle" icon={<EditOutlined />} onClick={() => handleModalOpen(record.id)} />
                        </Tooltip>
                    )}

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
            <Head title={lang.com.meetings} />
            <Card bordered={false} style={{ width: "100%", borderRadius: 0, paddingBottom: 20 }}>
                <Row justify={'space-between'} align={'middle'} style={{ marginBottom: 20, marginTop: 5 }}>
                    <Col>
                        <span className='page-title'>{lang.com.meetings}</span>
                    </Col>
                </Row>

                <div className='table-holder'>
                    <Table columns={columns} dataSource={rowdata} rowKey={(key) => key.id} loading={loading} pagination={{ defaultPageSize: 50 }} />
                </div>
            </Card>

            <Modal title={lang.com.update_status} open={isModalOpen} onCancel={handleModalCancel} footer={null}>
                <div className="form-holder" style={{ width: "100%" }}>
                    <Form
                        name="basic"
                        layout='vertical'
                        initialValues={data}
                        onFieldsChange={(changedFields) => {
                            changedFields.forEach(item => {
                                setData(item.name[0], item.value);
                            })
                        }}
                        onFinish={submit}
                        autoComplete="off"
                        encType="multipart/form-data"
                        style={{ maxWidth: "100%" }}
                    >
                        <Form.Item
                            label="Status"
                            name="status_id"
                            validateStatus={errors.status_id && 'error'}
                            help={errors.status_id}
                            rules={[
                                {
                                    required: true,
                                    message: lang.com.field_required,
                                }
                            ]}
                        >
                            <Select
                                placeholder={lang.com.select}
                                options={statuses.map((item) => ({
                                    label: item.name,
                                    value: item.id,
                                }))}
                            />
                        </Form.Item>
                        <Form.Item className="form-actions">
                            <Space size="middle">
                                <Button type="primary" htmlType="submit" loading={processing} size="large">
                                    {processing ? lang.com.please_wait : lang.com.submit}
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    );
};

Index.layout = page => <AgentLayout children={page} />

export default Index;
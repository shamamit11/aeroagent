import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, useForm, router } from "@inertiajs/react";
import { Button, Form, Input, Row, Col, message, Space, Card, Select, Badge, Divider, Modal, Dropdown, List } from "antd";
import { ArrowLeftOutlined, DownOutlined } from '@ant-design/icons';

import "./style.scss";

const { TextArea } = Input;

const Detail = () => {
    const props = usePage().props;
    const rowData = props.row;

    console.log(rowData);

    const activities = props.activities;
    const activityTypes = props.activityTypes;
    const statuses = props.statuses;

    const [title, setTitle] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hideDateField, setHideDateField] = useState(true);
    const [requiredField, setRequiredField] = useState(false);

    const items = statuses;

    const onMenuClick = (e) => {
        if (e.key == 2 || e.key == 3) {
            router.get(`/tenant/editData?id=${rowData.id}&status=${e.key}`)
        }
        else {
            const formData = {
                source_id: rowData.id,
                customer_type: "tenant",
                customer_id: rowData.customer_id,
                status: "No Deal"
            }
            router.post('/tenant/updateStatus', formData, {
                onSuccess: () => {
                    message.success('Status Updated Successfully !')
                },
                onError: () => {
                    message.error('There was an error processing your request. Please try again !')
                    router.get(`/tenant/detail?id=${rowData.id}`)
                },
                onFinish: () => {
                    router.get(`/tenant/detail?id=${rowData.id}`)
                }
            });
        }
    };

    useEffect(() => {
        setTitle(props.title);
    }, []);

    const handleBack = () => {
        router.get(`/tenant`)
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const updateActivityType = (value) => {
        if (value == 1) {
            setHideDateField(true);
        }
        else {
            setHideDateField(false);
            setRequiredField(true);
        }
    }

    const [form] = Form.useForm();

    const { data, setData, post, processing, errors } = useForm({
        source_id: rowData.id,
        customer_type: "tenant",
        customer_id: rowData.customer_id,
        activity_type: null,
        date: null,
        time: null,
        note: null,
    });

    const submit = () => {
        post('/tenant/activityAction', {
            onSuccess: () => {
                message.success('Activity Added Successfully !')
            },
            onError: () => {
                message.error('There was an error processing your request. Please try again !')
                router.get(`/tenant/detail?id=${rowData.id}`)
            },
            onFinish: () => {
                router.get(`/tenant/detail?id=${rowData.id}`)
            }
        });
    }

    return (
        <>
            <Card bordered={false} style={{ width: "100%", borderRadius: 0, paddingBottom: 20 }}>
                <Head title={title} />
                <Row justify={'space-between'} align={'middle'} style={{ marginBottom: 20, marginTop: 5 }}>
                    <Col>
                        <Space size={"small"}>
                            <span className='page-title'>{rowData.customer.name}</span>
                            <Badge color={rowData.status_color} count={rowData.status} />
                        </Space>
                    </Col>
                    <Col>
                        <Space size={"middle"}>
                            <Button type='primary' shape="circle" icon={<ArrowLeftOutlined />} size={"middle"} onClick={handleBack} />
                        </Space>
                    </Col>
                </Row>

                <Row justify={'space-between'} align={'top'} style={{ marginBottom: 20, marginTop: 5, width: "100%" }}>
                    <Col style={{ width: '28%' }}>
                        <Card title="Customer Information" headStyle={{ backgroundColor: "skyblue", color: "white" }} style={{ borderColor: "skyblue", marginBottom: 25 }}>
                            <Space size={"small"}>
                                <span style={{ fontWeight: 600 }}>Mobile:</span>
                                <span>{rowData.customer.mobile}</span>
                            </Space>
                            <Divider />
                            <Space size={"small"}>
                                <span style={{ fontWeight: 600 }}>Email:</span>
                                <span>{rowData.customer.email}</span>
                            </Space>
                            <Divider />
                            <Space size={"small"}>
                                <span style={{ fontWeight: 600 }}>Nationality:</span>
                                <span>{rowData.customer.nationality}</span>
                            </Space>
                        </Card>

                        <Card title="Quick Information" headStyle={{ backgroundColor: "skyblue", color: "white" }} style={{ borderColor: "skyblue" }}>
                            <Space size={"small"}>
                                <span style={{ fontWeight: 600 }}>Property:</span>
                                <span>{rowData.property.name}</span>
                            </Space>

                            {rowData?.property_type?.name && (
                                <>
                                    <Divider />
                                    <Space size={"small"}>
                                        <span style={{ fontWeight: 600 }}>Property Type:</span>
                                        <span>{rowData?.property_type?.name}</span>
                                    </Space>
                                </>
                            )}
                        </Card>
                    </Col>
                    <Col style={{ width: '70%' }}>
                        <Card style={{ marginBottom: 20 }}>
                            <Row justify={'space-between'} align={'middle'}>
                                <Col>
                                    <Button size={"large"} onClick={showModal}>Add Activity</Button>
                                </Col>
                                <Col>
                                    <Dropdown
                                        menu={{
                                            items,
                                            onClick: onMenuClick,
                                        }}
                                    >
                                        <Button size='large' style={{ borderColor: "red" }}>
                                            <Space>
                                                <span style={{ color: "red" }}>Update Status</span>
                                                <DownOutlined style={{ color: "red" }} />
                                            </Space>
                                        </Button>
                                    </Dropdown>
                                </Col>
                            </Row>
                        </Card>

                        {rowData.status == 'Deal' && (
                            <Card title="Property Information" headStyle={{ backgroundColor: "skyblue", color: "white" }} style={{ borderColor: "skyblue", marginBottom: 20 }}>
                                <Row justify={'space-between'} align={'top'}>
                                    <Col style={{ width: "32%" }}>
                                        <Space size={"small"}>
                                            <span style={{ fontWeight: 600 }}>Property:</span>
                                            <span>{rowData?.property.name}</span>
                                        </Space>
                                        <Divider />
                                        <Space size={"small"}>
                                            <span style={{ fontWeight: 600 }}>Budget:</span>
                                            <span>AED {rowData?.budget}</span>
                                        </Space>
                                    </Col>
                                    <Col style={{ width: "32%" }}>
                                        <Space size={"small"}>
                                            <span style={{ fontWeight: 600 }}>Property Type:</span>
                                            <span>{rowData?.property_type?.name}</span>
                                        </Space>
                                        <Divider />
                                        <Space size={"small"}>
                                            <span style={{ fontWeight: 600 }}>Time to Close:</span>
                                            <span>{rowData?.time_to_close} Days</span>
                                        </Space>
                                    </Col>
                                    <Col style={{ width: "32%" }}>
                                        <Space size={"small"}>
                                            <span style={{ fontWeight: 600 }}>Property Size:</span>
                                            <span>{rowData?.property_size} Sq. ft</span>
                                        </Space>
                                        <Divider />
                                    </Col>
                                </Row>
                                <Divider />
                                <Space size={"small"}>
                                    <span style={{ fontWeight: 600 }}>Amenities:</span>
                                    <span>{rowData?.amenities}</span>
                                </Space>
                                <Divider />
                                <Space size={"small"}>
                                    <span style={{ fontWeight: 600 }}>Note:</span>
                                    <span>{rowData?.note}</span>
                                </Space>
                            </Card>
                        )}

                        <Card title="Recent Activities" headStyle={{ backgroundColor: "lightwhite", color: "gray" }} style={{ borderColor: "lightwhite" }}>
                            <List
                                itemLayout="horizontal"
                                dataSource={activities}
                                renderItem={(item, index) => (
                                    <List.Item key={item.id}>
                                        <List.Item.Meta
                                            title={item.note}
                                            description={item.time_elapsed}
                                        />
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Col>
                </Row>
            </Card>

            <Modal title="Add Activity" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <div className="form-holder" style={{ width: "100%" }}>
                    <Form
                        form={form}
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
                            label="Activity Type"
                            name="activity_type"
                            validateStatus={errors.activity_type && 'error'}
                            help={errors.activity_type}
                            rules={[
                                {
                                    required: true,
                                    message: "This field is required",
                                }
                            ]}
                        >
                            <Select
                                placeholder="Select"
                                onChange={(value) => {
                                    updateActivityType(value)
                                }}
                                options={activityTypes.map((item) => ({
                                    label: item.name,
                                    value: item.id,
                                    disabled: item.disabled
                                }))}
                            />
                        </Form.Item>

                        {!hideDateField && (
                            <>
                                <Form.Item
                                    label="Date"
                                    name="date"
                                    validateStatus={errors.date && 'error'}
                                    help={errors.date}
                                    rules={[
                                        {
                                            required: requiredField,
                                            message: "This field is required",
                                        }
                                    ]}
                                >
                                    <Input type='date' />
                                </Form.Item>

                                <Form.Item
                                    label="Time"
                                    name="time"
                                    validateStatus={errors.time && 'error'}
                                    help={errors.time}
                                    rules={[
                                        {
                                            required: requiredField,
                                            message: "This field is required",
                                        }
                                    ]}
                                >
                                    <Input type='time' />
                                </Form.Item>
                            </>
                        )}

                        <Form.Item
                            label="Note"
                            name="note"
                            validateStatus={errors.note && 'error'}
                            help={errors.note}
                            rules={[
                                {
                                    required: true,
                                    message: "This field is required",
                                }
                            ]}
                        >
                            <TextArea rows={4} />
                        </Form.Item>

                        <Form.Item className="form-actions">
                            <Space size="middle">
                                <Button type="primary" htmlType="submit" loading={processing} size="large">
                                    {processing ? "Please Wait" : "Submit"}
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    );
};

Detail.layout = page => <AuthenticatedLayout children={page} />

export default Detail;
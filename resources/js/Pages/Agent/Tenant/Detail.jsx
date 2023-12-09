import React, { useState } from 'react';
import AgentLayout from '@/Layouts/AgentLayout';
import { Head, usePage, useForm, router } from "@inertiajs/react";
import { Button, Form, Input, Row, Col, message, Space, Card, Select, Badge, Divider, Modal, Dropdown, List } from "antd";
import { ArrowLeftOutlined, DownOutlined } from '@ant-design/icons';
import { getObjectValue } from '@/utils';

const { TextArea } = Input;

const Detail = () => {
    const props = usePage().props;
    const { locale, lang } = usePage().props;
    const rowData = props.row;

    const activities = props.activities;
    const activityTypes = props.activityTypes;
    const statuses = props.statuses;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hideDateField, setHideDateField] = useState(true);
    const [requiredField, setRequiredField] = useState(false);

    const statusItems = statuses;

    const requestItems = [
        { key: 'seller', label: lang.com.seller, name: lang.com.seller },
        { key: 'buyer', label:  lang.com.buyer, name: lang.com.buyer },
        { key: 'leaser', label: lang.com.leaser, name: lang.com.leaser }
    ];

    const onStatusMenuClick = (e) => {
        let status_label

        if (e.key == 4) {
            status_label = 'Not Interested'
        }

        if (e.key == 5) {
            status_label = 'Deal'
        }

        if (e.key == 2 || e.key == 3) {
            router.get(`/tenant/editData?id=${rowData.id}&status=${e.key}`)
        }
        else {
            const formData = {
                source_id: rowData.id,
                customer_type: "tenant",
                customer_id: rowData.customer_id,
                status: status_label
            }
            router.post('/tenant/updateStatus', formData, {
                onSuccess: () => {
                    message.success(lang.com.status_updated)
                },
                onError: () => {
                    message.error(lang.com.error_request)
                    router.get(`/tenant/detail?id=${rowData.id}`)
                },
                onFinish: () => {
                    router.get(`/tenant/detail?id=${rowData.id}`)
                }
            });
        }
    };

    const onRequestMenuClick = (e) => {
        if (e.key == "seller") {
            router.get(`/seller/addEdit?id=0&customer_id=${rowData.customer_id}&request_type=tenant&source_id=${rowData.id}`)
        }
        if (e.key == "buyer") {
            router.get(`/buyer/addEdit?id=0&customer_id=${rowData.customer_id}&request_type=tenant&source_id=${rowData.id}`)
        }
        if (e.key == "leaser") {
            router.get(`/leaser/addEdit?id=0&customer_id=${rowData.customer_id}&request_type=tenant&source_id=${rowData.id}`)
        }
    }

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
                message.success(lang.com.activity_added)
            },
            onError: () => {
                message.error(lang.com.error_request)
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
                <Head title={lang.com.tenant_details} />
                <Row justify={'space-between'} align={'middle'} style={{ marginBottom: 20, marginTop: 5 }}>
                    <Col>
                        <Space size={"small"}>
                            <span className='page-title'>{rowData.customer.name}</span>
                            <Badge color={rowData.status_color} count={getObjectValue(lang, "com", rowData.status)} />
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
                        <Card title={lang.com.customer_information} headStyle={{ backgroundColor: "skyblue", color: "white" }} style={{ borderColor: "skyblue", marginBottom: 25 }}>
                            <Space size={"small"}>
                                <span style={{ fontWeight: 600 }}>{lang.com.mobile} :</span>
                                <span>{rowData.customer.mobile}</span>
                            </Space>
                            <Divider />
                            <Space size={"small"}>
                                <span style={{ fontWeight: 600 }}>{lang.com.email} :</span>
                                <span>{rowData.customer.email}</span>
                            </Space>
                            <Divider />
                            <Space size={"small"}>
                                <span style={{ fontWeight: 600 }}>{lang.com.nationality} :</span>
                                <span>{rowData.customer.nationality}</span>
                            </Space>
                        </Card>

                        <Card title={lang.com.quick_information} headStyle={{ backgroundColor: "skyblue", color: "white" }} style={{ borderColor: "skyblue" }}>
                            <Space size={"small"}>
                                <span style={{ fontWeight: 600 }}>{lang.com.property} :</span>
                                <span>{locale == 'ar' ? rowData.property.ar_name : rowData.property.name}</span>
                            </Space>

                            {rowData?.property_type?.name && (
                                <>
                                    <Divider />
                                    <Space size={"small"}>
                                        <span style={{ fontWeight: 600 }}>{lang.com.property_type} :</span>
                                        <span>{locale == 'ar' ? rowData?.property_type?.ar_name : rowData?.property_type?.name}</span>
                                    </Space>
                                </>
                            )}
                        </Card>
                    </Col>
                    <Col style={{ width: '70%' }}>
                        <Card style={{ marginBottom: 20 }}>
                            <Row justify={'space-between'} align={'middle'}>
                                <Col>
                                    <Button size={"large"} onClick={showModal}>{lang.com.add_activity}</Button>
                                </Col>
                                <Col>
                                    <Space size={'middle'}>
                                        {rowData.status != 'Deal' && (
                                            <Dropdown
                                                menu={{
                                                    items: statusItems,
                                                    onClick: onStatusMenuClick,
                                                }}
                                            >
                                                <Button size='large' style={{ borderColor: "red" }}>
                                                    <Space>
                                                        <span style={{ color: "red" }}>{lang.com.update_status}</span>
                                                        <DownOutlined style={{ color: "red" }} />
                                                    </Space>
                                                </Button>
                                            </Dropdown>
                                        )}

                                        <Dropdown
                                            menu={{
                                                items: requestItems,
                                                onClick: onRequestMenuClick,
                                            }}
                                        >
                                            <Button size='large' style={{ borderColor: "green" }}>
                                                <Space>
                                                    <span style={{ color: "green" }}>{lang.com.create_new_request_as} :</span>
                                                    <DownOutlined style={{ color: "green" }} />
                                                </Space>
                                            </Button>
                                        </Dropdown>
                                    </Space>
                                </Col>
                            </Row>
                        </Card>

                        {(rowData.status == 'Interested' || rowData.status == 'Deal' || rowData.status == 'Potential') && (
                            <Card title={lang.com.property_information} headStyle={{ backgroundColor: "skyblue", color: "white" }} style={{ borderColor: "skyblue", marginBottom: 20 }}>
                                <Row justify={'space-between'} align={'top'}>
                                    <Col style={{ width: "32%" }}>
                                        <Space size={"small"}>
                                            <span style={{ fontWeight: 600 }}>{lang.com.property} :</span>
                                            <span>{locale == 'ar' ? rowData.property.ar_name : rowData.property.name}</span>
                                        </Space>
                                        <Divider />
                                        <Space size={"small"}>
                                            <span style={{ fontWeight: 600 }}>{lang.com.budget} :</span>
                                            <span>AED {rowData?.budget}</span>
                                        </Space>
                                    </Col>
                                    <Col style={{ width: "32%" }}>
                                        <Space size={"small"}>
                                            <span style={{ fontWeight: 600 }}>{lang.com.property_type} :</span>
                                            <span>{locale == 'ar' ? rowData?.property_type?.ar_name : rowData?.property_type?.name}</span>
                                        </Space>
                                        <Divider />
                                        <Space size={"small"}>
                                            <span style={{ fontWeight: 600 }}>{lang.com.time_to_close} :</span>
                                            <span>{rowData?.time_to_close} {lang.com.days}</span>
                                        </Space>
                                    </Col>
                                    <Col style={{ width: "32%" }}>
                                        <Space size={"small"}>
                                            <span style={{ fontWeight: 600 }}>{lang.com.property_size} :</span>
                                            <span>{rowData?.property_size} {lang.com.sqft}</span>
                                        </Space>
                                        <Divider />
                                    </Col>
                                </Row>
                                <Divider />
                                <Space size={"small"}>
                                    <span style={{ fontWeight: 600 }}>{lang.com.amenities} :</span>
                                    <span>{rowData?.amenities}</span>
                                </Space>
                                <Divider />
                                <Space size={"small"}>
                                    <span style={{ fontWeight: 600 }}>{lang.com.note} :</span>
                                    <span>{rowData?.note}</span>
                                </Space>
                            </Card>
                        )}

                        <Card title={lang.com.recent_activities} headStyle={{ backgroundColor: "lightwhite", color: "gray" }} style={{ borderColor: "lightwhite" }}>
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

            <Modal title={lang.com.add_activity} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
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
                            label={lang.com.activity_type}
                            name="activity_type"
                            validateStatus={errors.activity_type && 'error'}
                            help={errors.activity_type}
                            rules={[
                                {
                                    required: true,
                                    message: lang.com.field_required,
                                }
                            ]}
                        >
                            <Select
                                placeholder={lang.com.select}
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
                                    label={lang.com.date}
                                    name="date"
                                    validateStatus={errors.date && 'error'}
                                    help={errors.date}
                                    rules={[
                                        {
                                            required: requiredField,
                                            message: lang.com.field_required,
                                        }
                                    ]}
                                >
                                    <Input type='date' />
                                </Form.Item>

                                <Form.Item
                                    label={lang.com.time}
                                    name="time"
                                    validateStatus={errors.time && 'error'}
                                    help={errors.time}
                                    rules={[
                                        {
                                            required: requiredField,
                                            message: lang.com.field_required,
                                        }
                                    ]}
                                >
                                    <Input type='time' />
                                </Form.Item>
                            </>
                        )}

                        <Form.Item
                            label={lang.com.note}
                            name="note"
                            validateStatus={errors.note && 'error'}
                            help={errors.note}
                            rules={[
                                {
                                    required: true,
                                    message: lang.com.field_required,
                                }
                            ]}
                        >
                            <TextArea rows={4} />
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

Detail.layout = page => <AgentLayout children={page} />

export default Detail;
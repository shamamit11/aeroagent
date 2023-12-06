import React from 'react';
import AgentLayout from '@/Layouts/AgentLayout';
import { Head, usePage, useForm, router } from "@inertiajs/react";
import { Button, Form, Input, Row, Col, message, Space, Card, Select } from "antd";

const AddEdit = () => {
    const props = usePage().props;
    const rowData = props.row;
    const { lang } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        id: (rowData?.id) ? rowData?.id : 0,
        name: rowData?.name,
        email: rowData?.email,
        mobile: rowData?.mobile,
        nationality: rowData?.nationality,
        customer_type: 'default'
    });

    const submit = () => {
        post('/customer/addAction', {
            onSuccess: () => {
                if (data.id == 0) {
                    message.success(lang.com.data_added)
                }
                else {
                    message.success(lang.com.data_updated)
                }
            },
            onError: () => {
                message.error(lang.com.error_request)
            },
            onFinish: () => {
                if(data.customer_type == 'default') {
                    router.get('/customer')  
                }
                else {
                    router.get(`/${data.customer_type}/addEdit`) 
                }
            }
        });
    };

    const handleCancel = () => {
        router.get('/customer')
    }

    return (
        <Card bordered={false} style={{ width: "100%", borderRadius: 0, paddingBottom: 20 }}>
            <Head title={rowData?.id ? lang.com.edit_customer : lang.com.add_customer} />
            <Row justify={'space-between'} align={'middle'} style={{ marginBottom: 20, marginTop: 5 }}>
                <Col>
                    <span className='page-title'>{rowData?.id ? lang.com.edit_customer : lang.com.add_customer}</span>
                </Col>
            </Row>

            <div className="form-holder">
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
                >
                    <Form.Item
                        label={lang.com.name}
                        name="name"
                        validateStatus={errors.name && 'error'}
                        help={errors.name}
                        rules={[
                            {
                                required: true,
                                message: lang.com.field_required,
                            }
                        ]}
                    >
                        <Input disabled={processing} />
                    </Form.Item>

                    <Form.Item
                        label={lang.com.email}
                        name="email"
                        validateStatus={errors.email && 'error'}
                        help={errors.email}
                        rules={[
                            {
                                required: true,
                                message: lang.com.field_required,
                            }
                        ]}
                    >
                        <Input type="email" disabled={processing} />
                    </Form.Item>

                    <Form.Item
                        label={lang.com.mobile + " (+971 ...)"}
                        name="mobile"
                        validateStatus={errors.mobile && 'error'}
                        help={errors.mobile}
                        rules={[
                            {
                                required: true,
                                message: lang.com.field_required,
                            }
                        ]}
                    >
                        <Input disabled={processing} />
                    </Form.Item>

                    <Form.Item
                        label={lang.com.nationality}
                        name="nationality"
                        validateStatus={errors.nationality && 'error'}
                        help={errors.nationality}
                        rules={[
                            {
                                required: true,
                                message: lang.com.field_required,
                            }
                        ]}
                    >
                        <Input disabled={processing} />
                    </Form.Item>

                    {!rowData?.id && (
                        <Form.Item
                            label={lang.com.adding_customer_as}
                            name="customer_type"
                            validateStatus={errors.customer_type && 'error'}
                            help={errors.customer_type}
                            rules={[
                                {
                                    required: true,
                                    message: lang.com.field_required,
                                }
                            ]}
                        >
                            <Select
                                disabled={processing}
                                options={[
                                    {
                                        value: 'default',
                                        label: lang.com.default,
                                    },
                                    {
                                        value: 'seller',
                                        label: lang.com.seller,
                                    },
                                    {
                                        value: 'buyer',
                                        label: lang.com.buyer,
                                    },
                                    {
                                        value: 'leaser',
                                        label: lang.com.leaser,
                                    },
                                    {
                                        value: 'tenant',
                                        label: lang.com.tenant,
                                    }
                                ]}
                            />
                        </Form.Item>
                    )}


                    <Form.Item className="form-actions">
                        <Space size="middle">
                            <Button type="primary" htmlType="submit" loading={processing} size="large">
                                {processing ? lang.com.please_wait : lang.com.submit}
                            </Button>

                            <Button danger size="large" onClick={handleCancel}>
                                {lang.com.cancel}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </Card>
    );
};

AddEdit.layout = page => <AgentLayout children={page} />

export default AddEdit;
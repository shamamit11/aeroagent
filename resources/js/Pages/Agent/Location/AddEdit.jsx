import React from 'react';
import AgentLayout from '@/Layouts/AgentLayout';
import { Head, usePage, useForm, router } from "@inertiajs/react";
import { Button, Form, Input, Row, Col, message, Space, Card } from "antd";

const AddEdit = () => {
    const props = usePage().props;
    const { lang } = usePage().props;
    const rowData = props.row;

    const { data, setData, post, processing, errors } = useForm({
        id: (rowData?.id) ? rowData?.id : 0,
        name: rowData?.name,
        city: rowData?.city,
        country: rowData?.country,
    });

    const submit = () => {
        post('/location/addAction', {
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
                router.get('/location')
            }
        });
    };

    const handleCancel = () => {
        router.get('/location')
    }

    return (
        <>
            <Card bordered={false} style={{ width: "100%", borderRadius: 0, paddingBottom: 20 }}>
                <Head title={rowData?.id ? lang.com.edit_location : lang.com.add_location} />
                <Row justify={'space-between'} align={'middle'} style={{ marginBottom: 20, marginTop: 5 }}>
                    <Col>
                        <span className='page-title'>{rowData?.id ? lang.com.edit_location : lang.com.add_location}</span>
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
                            <Input
                                disabled={processing}
                            />
                        </Form.Item>

                        <Form.Item
                            label={lang.com.city}
                            name="city"
                            validateStatus={errors.city && 'error'}
                            help={errors.city}
                            rules={[
                                {
                                    required: true,
                                    message: lang.com.field_required,
                                }
                            ]}
                        >
                            <Input
                                disabled={processing}
                            />
                        </Form.Item>

                        <Form.Item
                            label={lang.com.country}
                            name="country"
                            validateStatus={errors.country && 'error'}
                            help={errors.country}
                            rules={[
                                {
                                    required: true,
                                    message: lang.com.field_required,
                                }
                            ]}
                        >
                            <Input
                                disabled={processing}
                            />
                        </Form.Item>

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
        </>
    );
};

AddEdit.layout = page => <AgentLayout children={page} />

export default AddEdit;
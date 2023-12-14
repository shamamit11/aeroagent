import React, { useEffect, useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, usePage, useForm, router } from "@inertiajs/react";
import { Button, Form, Input, Row, Col, message, Space, Select, Card } from "antd";

const AddEdit = () => {
    const props = usePage().props;
    const { lang } = usePage().props;
    const rowData = props.row;
    const properties = props.properties;
    const [title, setTitle] = useState('');

    const { data, setData, post, processing, errors } = useForm({
        id: (rowData?.id) ? rowData?.id : 0,
        name: rowData?.name,
        ar_name: rowData?.ar_name,
        property_id: (rowData?.property_id) ? rowData?.property_id : 1
    });

    useEffect(() => {
        setTitle(props.title);
    }, []);

    const submit = () => {
        post('/admin/propertyType/addAction', {
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
                router.get('/admin/propertyType')
            }
        });
    };

    const handleCancel = () => {
        router.get('/admin/propertyType')
    }

    return (
        <Card bordered={false} style={{ width: "100%", borderRadius: 0, paddingBottom: 20 }}>

            <Head title={title} />
            <Row justify={'space-between'} align={'middle'}>
                <Col>
                    <h1 className='page-title'>{title}</h1>
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
                        label="Name (English)"
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
                        label="Name (Arabic)"
                        name="ar_name"
                        validateStatus={errors.ar_name && 'error'}
                        help={errors.ar_name}
                        rules={[
                            {
                                required: true,
                                message: lang.com.field_required,
                            }
                        ]}
                    >
                        <Input
                            disabled={processing}
                            style={{ textAlign: 'right' }}
                        />
                    </Form.Item>

                    <Form.Item
                        label={lang.com.property}
                        name="property_id"
                        validateStatus={errors.property_id && 'error'}
                        help={errors.property_id}
                        rules={[
                            {
                                required: true,
                                message: lang.com.field_required,
                            }
                        ]}
                    >
                        <Select
                            options={properties.map((item) => ({
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

AddEdit.layout = page => <AdminLayout children={page} />

export default AddEdit;
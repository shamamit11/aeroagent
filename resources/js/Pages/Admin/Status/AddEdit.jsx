import React, { useEffect, useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, usePage, useForm, router } from "@inertiajs/react";
import { Button, Form, Input, Row, Col, message, Space, Select } from "antd";

const AddEdit = () => {
    const props = usePage().props;
const { lang } = usePage().props;
    const rowData = props.row;
    const [title, setTitle] = useState('');

    const { data, setData, post, processing, errors } = useForm({
        id: (rowData?.id) ? rowData?.id : 0,
        name: rowData?.name,
        color: (rowData?.color) ? rowData?.color : "#000000",
        type: (rowData?.type) ? rowData?.type : 'listing_lead',
    });

    useEffect(() => {
        setTitle(props.title);
    }, []);

    const submit = () => {
        post('/admin/status/addAction', {
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
                router.get('/admin/status')
            }
        });
    };

    const handleCancel = () => {
        router.get('/admin/status')
    }

    return (
        <>
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
                        label="Color"
                        name="color"
                        validateStatus={errors.color && 'error'}
                        help={errors.color}
                        rules={[
                            {
                                required: true,
                                message: lang.com.field_required,
                            }
                        ]}
                    >
                        <Input
                            size='large'
                            type='color'
                            disabled={processing}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Type"
                        name="type"
                        validateStatus={errors.type && 'error'}
                        help={errors.type}
                        rules={[
                            {
                                required: true,
                                message: lang.com.field_required,
                            }
                        ]}
                    >
                        <Select
                            options={[
                                {
                                    value: 'listing_lead',
                                    label: 'Listing / Lead',
                                },
                                {
                                    value: 'meeting',
                                    label: 'Meeting',
                                }
                            ]}
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

        </>
    );
};

AddEdit.layout = page => <AdminLayout children={page} />

export default AddEdit;
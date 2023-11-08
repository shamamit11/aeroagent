import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, useForm, router } from "@inertiajs/react";
import { Button, Form, Input, Row, Col, message, Space, Card, Select } from "antd";

import "./style.scss";

const Import = () => {
    const [form] = Form.useForm();

    const props = usePage().props;
    const [title, setTitle] = useState('');

    const properties = props.properties;
    const locations = props.locations;

    const { data, setData, post, processing, errors } = useForm({
        location_id: '',
        property_id: '',
        filepath: '',
        upload_file: null
    });

    useEffect(() => {
        setTitle(props.title);
    }, []);

    const submit = () => {
        post('/leaser/importAction', {
            forceFormData: true,
            onSuccess: () => {
                 message.success('Data Imported Successfully !')
            },
            onError: () => {
                message.error('There was an error processing your request. Please try again !')
                router.get('/leaser/import')
            },
            onFinish: () => {
                router.get(`/leaser/list?lid=${data.location_id}`)
            }
        });
    };

    const handleCancel = () => {
        router.get('/leaser')
    }

    return (
        <>
            <Card bordered={false} style={{ width: "100%", borderRadius: 0, paddingBottom: 20 }}>
                <Head title={title} />
                <Row justify={'space-between'} align={'middle'} style={{ marginBottom: 20, marginTop: 5 }}>
                    <Col>
                        <span className='page-title'>{title}</span>
                    </Col>
                </Row>

                <div className="form-holder" style={{ width: '40%' }}>
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
                    >

                        <Form.Item
                            label="Property"
                            name="property_id"
                            validateStatus={errors.property_id && 'error'}
                            help={errors.property_id}
                            rules={[
                                {
                                    required: true,
                                    message: "This field is required",
                                }
                            ]}
                        >
                            <Select
                                placeholder="Select"
                                options={properties.map((item) => ({
                                    label: item.name,
                                    value: item.id,
                                }))}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Location"
                            name="location_id"
                            validateStatus={errors.location_id && 'error'}
                            help={errors.location_id}
                            rules={[
                                {
                                    required: true,
                                    message: "This field is required",
                                }
                            ]}
                        >
                            <Select
                                placeholder="Select"
                                options={locations.map((item) => ({
                                    label: item.name,
                                    value: item.id,
                                }))}
                            />
                        </Form.Item>


                        <Form.Item
                            label="Select File to Import"
                            name="filepath"
                            validateStatus={errors.filepath && 'error'}
                            help={errors.filepath}
                            rules={[
                                {
                                    required: true,
                                    message: "This field is required",
                                }
                            ]}
                        >
                            <Input type='file' accept='.csv,.xls,.xlsx' onChange={e => setData('upload_file', e.target.files[0])}/>
                        </Form.Item>

                        <Form.Item className="form-actions">
                            <Space size="middle">
                                <Button type="primary" htmlType="submit" loading={processing} size="large">
                                    {processing ? "Please Wait" : "Submit"}
                                </Button>

                                <Button danger size="large" onClick={handleCancel}>
                                    Cancel
                                </Button>
                            </Space>
                        </Form.Item>

                        <div style={{ marginTop: 25, marginBottom: 0 }}>
                            <a href='/sample-files/sample-leaser.xls' download target="_blank">Download Sample File</a>
                        </div>

                    </Form>
                </div>
            </Card>
        </>
    );
};

Import.layout = page => <AuthenticatedLayout children={page} />

export default Import;
import React, { useEffect, useState } from 'react';
import AgentLayout from '@/Layouts/AgentLayout';
import { Head, usePage, useForm, router } from "@inertiajs/react";
import { Button, Form, Input, Row, Col, message, Space, Card, Select } from "antd";

const Import = () => {
    const [form] = Form.useForm();

    const props = usePage().props;
    const { locale, lang } = usePage().props;
    const [title, setTitle] = useState('');

    const properties = props.properties;
    const projects = props.projects;

    const { data, setData, post, processing, errors } = useForm({
        project_id: '',
        property_id: '',
        filepath: '',
        upload_file: null
    });

    useEffect(() => {
        setTitle(props.title);
    }, []);

    const submit = () => {
        post('/buyer/importAction', {
            forceFormData: true,
            onSuccess: () => {
                message.success(lang.com.data_imported)
            },
            onError: () => {
                message.error(lang.com.error_request)
                router.get('/buyer/import')
            },
            onFinish: () => {
                router.get(`/buyer`)
            }
        });
    };

    const handleCancel = () => {
        router.get('/buyer')
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
                                placeholder={lang.com.select}
                                options={properties.map((item) => ({
                                    label: locale == 'ar' ? item.ar_name : item.name,
                                    value: item.id,
                                }))}
                            />
                        </Form.Item>

                        <Form.Item
                            label={lang.com.project}
                            name="project_id"
                            validateStatus={errors.project_id && 'error'}
                            help={errors.project_id}
                            rules={[
                                {
                                    required: true,
                                    message: lang.com.field_required,
                                }
                            ]}
                        >
                            <Select
                                placeholder={lang.com.select}
                                options={projects.map((item) => ({
                                    label: item.name,
                                    value: item.id,
                                }))}
                            />
                        </Form.Item>


                        <Form.Item
                            label={lang.com.select_file_to_import}
                            name="filepath"
                            validateStatus={errors.filepath && 'error'}
                            help={errors.filepath}
                            rules={[
                                {
                                    required: true,
                                    message: lang.com.field_required,
                                }
                            ]}
                        >
                            <Input type='file' accept='.csv,.xls,.xlsx' onChange={e => setData('upload_file', e.target.files[0])} />
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

                        <div style={{ marginTop: 25, marginBottom: 0 }}>
                            <a href='/sample-files/sample-buyer.xls' download target="_blank">{lang.com.download_sample_file}</a>
                        </div>

                    </Form>
                </div>
            </Card>
        </>
    );
};

Import.layout = page => <AgentLayout children={page} />

export default Import;
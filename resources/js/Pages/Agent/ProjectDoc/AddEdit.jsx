import React from 'react';
import AgentLayout from '@/Layouts/AgentLayout';
import { Head, usePage, useForm, router } from "@inertiajs/react";
import { Button, Form, Input, Row, Col, message, Space, Card } from "antd";

const AddEdit = () => {
    const props = usePage().props;
    const { lang } = usePage().props;
    const rowData = props.row;
    const pid = props.pid;

    const { data, setData, post, processing, errors, reset } = useForm({
        id: (rowData?.id) ? rowData?.id : 0,
        project_id: (rowData?.project_id) ? rowData?.project_id : pid,
        doc_type: rowData?.doc_type,
        link: rowData?.link,
    });

    const submit = () => {
        post('/project/doc/addAction', {
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
                router.get(`/project/doc?pid=${pid}`)
            }
        });
    };

    const handleCancel = () => {
        router.get(`/project/doc?pid=${pid}`)
    }

    return (
        <Card bordered={false} style={{ width: "100%", borderRadius: 0, paddingBottom: 20 }}>
            <Head title={rowData?.id ? lang.com.edit_project_document : lang.com.add_project_document} />
            <Row justify={'space-between'} align={'middle'} style={{ marginBottom: 20, marginTop: 5 }}>
                <Col>
                    <span className='page-title'>{rowData?.id ? lang.com.edit_project_document : lang.com.add_project_document} </span>
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
                        label={lang.com.document_type}
                        name="doc_type"
                        validateStatus={errors.doc_type && 'error'}
                        help={errors.doc_type}
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
                        label={lang.com.link}
                        name="link"
                        validateStatus={errors.link && 'error'}
                        help={errors.link}
                        rules={[
                            {
                                required: true,
                                message: lang.com.field_required,
                            }
                        ]}
                    >
                        <Input type="url" disabled={processing} />
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

AddEdit.layout = page => <AgentLayout children={page} />

export default AddEdit;
import React, { useEffect, useState } from 'react';
import AgentLayout from '@/Layouts/AgentLayout';
import { Head, usePage, useForm, router } from "@inertiajs/react";
import { Button, Form, Input, Row, Col, message, Space, Card } from "antd";

import "./style.scss";

const AddEdit = () => {
    const props = usePage().props;
    const rowData = props.row;
    const pid = props.pid;

    const [title, setTitle] = useState('');

    const { data, setData, post, processing, errors, reset } = useForm({
        id: (rowData?.id) ? rowData?.id : 0,
        project_id: (rowData?.project_id) ? rowData?.project_id : pid,
        doc_type: rowData?.doc_type,
        link: rowData?.link,
    });

    useEffect(() => {
        setTitle(props.title);
    }, []);

    const submit = () => {
        post('/project/doc/addAction', {
            onSuccess: () => {
                if (data.id == 0) {
                    message.success('Data Added Successfully !')
                }
                else {
                    message.success('Data Updated Successfully !')
                }
            },
            onError: () => {
                message.error('There was an error processing your request. Please try again !')
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
            <Head title={title} />
            <Row justify={'space-between'} align={'middle'} style={{marginBottom: 20, marginTop: 5}}>
                <Col>
                    <span className='page-title'>{title}</span>
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
                        label="Document Type"
                        name="doc_type"
                        validateStatus={errors.doc_type && 'error'}
                        help={errors.doc_type}
                        rules={[
                            {
                                required: true,
                                message: "This field is required",
                            }
                        ]}
                    >
                        <Input disabled={processing}/>
                    </Form.Item>

                    <Form.Item
                        label="Link / URL"
                        name="link"
                        validateStatus={errors.link && 'error'}
                        help={errors.link}
                        rules={[
                            {
                                required: true,
                                message: "This field is required",
                            }
                        ]}
                    >
                        <Input type="url" disabled={processing}/>
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
                </Form>
            </div>
        </Card>
    );
};

AddEdit.layout = page => <AgentLayout children={page} />

export default AddEdit;
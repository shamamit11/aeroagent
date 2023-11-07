import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, useForm, router } from "@inertiajs/react";
import { Button, Form, Input, Row, Col, message, Space, Card } from "antd";

import "./style.scss";

const AddEdit = () => {
    const props = usePage().props;
    const rowData = props.row;
    const [title, setTitle] = useState('');

    const { data, setData, post, processing, errors } = useForm({
        id: (rowData?.id) ? rowData?.id : 0,
        name: rowData?.name,
        email: rowData?.email,
        mobile: rowData?.mobile,
        nationality: rowData?.nationality,
    });

    useEffect(() => {
        setTitle(props.title);
    }, []);

    const submit = () => {
        post('/customer/addAction', {
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
                router.get('/customer')
            }
        });
    };

    const handleCancel = () => {
        router.get('/customer')
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
                        label="Customer Name"
                        name="name"
                        validateStatus={errors.name && 'error'}
                        help={errors.name}
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
                        label="Email"
                        name="email"
                        validateStatus={errors.email && 'error'}
                        help={errors.email}
                        rules={[
                            {
                                required: true,
                                message: "This field is required",
                            }
                        ]}
                    >
                        <Input type="email" disabled={processing}/>
                    </Form.Item>

                    <Form.Item
                        label="Mobile Ex: (+971 ...)"
                        name="mobile"
                        validateStatus={errors.mobile && 'error'}
                        help={errors.mobile}
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
                        label="Nationality"
                        name="nationality"
                        validateStatus={errors.nationality && 'error'}
                        help={errors.nationality}
                        rules={[
                            {
                                required: true,
                                message: "This field is required",
                            }
                        ]}
                    >
                        <Input disabled={processing}/>
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

AddEdit.layout = page => <AuthenticatedLayout children={page} />

export default AddEdit;
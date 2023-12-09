import React, { useEffect, useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, usePage, useForm, router } from "@inertiajs/react";
import { Button, Form, Input, Row, Col, message, Space, Card, Select } from "antd";

const AddEdit = () => {
    const props = usePage().props;
const { lang } = usePage().props;
    const rowData = props.row;
    const [title, setTitle] = useState('');

    const { data, setData, post, processing, errors } = useForm({
        id: 0,
        profession: undefined,
        first_name: "",
        last_name: "",
        mobile: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        setTitle(props.title);
    }, []);

    const submit = () => {
        post('/admin/user/addAction', {
            onSuccess: () => {
                message.success('User Added Successfully !')
            },
            onError: () => {
                message.error(lang.com.error_request)
            },
            onFinish: () => {
                router.get('/admin/user')
            }
        });
    };

    const handleCancel = () => {
        router.get('/admin/user')
    }


    return (
        <Card bordered={false} style={{ width: "100%", borderRadius: 0, paddingBottom: 20 }}>
            <Head title={title} />
            <Row justify={'space-between'} align={'middle'}>
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
                        name="profession"
                        validateStatus={errors.profession && 'error'}
                        help={errors.profession}
                        rules={[
                            {
                                required: true,
                                message: "Please select Profession!",
                            }
                        ]}
                    >
                        <Select
                            disabled={processing}
                            placeholder={"Select Your Profession"}
                            options={[
                                {
                                    value: 'Real Estate Specialist',
                                    label: 'Real Estate Specialist',
                                },
                                {
                                    value: 'Affiliate',
                                    label: 'Affiliate Marketing',
                                }
                            ]}
                        />
                    </Form.Item>

                    <Row justify={'space-between'} align={'middle'}>
                        <Col style={{ width: "49%" }}>
                            <Form.Item
                                label="First Name"
                                name="first_name"
                                validateStatus={errors.first_name && 'error'}
                                help={errors.first_name}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input First Name!",
                                    }
                                ]}
                            >
                                <Input
                                    disabled={processing}
                                />
                            </Form.Item>
                        </Col>
                        <Col style={{ width: "49%" }}>
                            <Form.Item
                                label="Last Name"
                                name="last_name"
                                validateStatus={errors.last_name && 'error'}
                                help={errors.last_name}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input Last Name!",
                                    }
                                ]}
                            >
                                <Input
                                    disabled={processing}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row justify={'space-between'} align={'middle'}>
                        <Col style={{ width: "49%" }}>
                            <Form.Item
                                label="Mobile"
                                name="mobile"
                                validateStatus={errors.mobile && 'error'}
                                help={errors.mobile}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input Mobile No!",
                                    }
                                ]}
                            >
                                <Input
                                    disabled={processing}
                                    placeholder={"Ex: +97150XXXXXXX"}
                                />
                            </Form.Item>
                        </Col>
                        <Col style={{ width: "49%" }}>
                            <Form.Item
                                label="Email Address"
                                name="email"
                                validateStatus={errors.email && 'error'}
                                help={errors.email}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input E-mail!",
                                    },
                                    {
                                        type: "email",
                                        message: "Invalid E-mail",
                                    },
                                    {
                                        max: 50,
                                        message: "E-mail should not exceed 50 characters",
                                    },
                                ]}
                            >
                                <Input
                                    disabled={processing}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row justify={'space-between'} align={'middle'}>
                        <Col style={{ width: "49%" }}>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input password!",
                                    },
                                    {
                                        max: 50,
                                        message: "Password should not exceed 50 characters",
                                    },
                                ]}
                                validateStatus={errors.password && 'error'}
                                help={errors.password}
                            >
                                <Input
                                    disabled={processing}
                                    autoComplete="current-password"
                                />
                            </Form.Item>
                        </Col>
                        <Col style={{ width: "49%" }}>
                            <Form.Item
                                label="Confirm Password"
                                name="password_confirmation"
                                validateStatus={errors.password_confirmation && 'error'}
                                help={errors.password_confirmation}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please confirm Password!",
                                    }
                                ]}
                            >
                                <Input
                                    disabled={processing}
                                    autoComplete="current-password"
                                />
                            </Form.Item>
                        </Col>
                    </Row>

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
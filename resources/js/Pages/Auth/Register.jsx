import React from 'react';
import { Head, useForm, Link, router } from "@inertiajs/react";
import { Button, Divider, Form, Input, Select, Checkbox, Radio } from "antd";
import { LockOutlined, MailOutlined, PhoneOutlined, UserOutlined, CodeOutlined } from "@ant-design/icons";

import Logo from "../../../../public/favicon.svg";

import "./style.scss";

const Register = () => {

    const { data, setData, post, processing, errors, reset } = useForm({
        profession: undefined,
        first_name: '',
        last_name: '',
        mobile: '',
        email: '',
        password: '',
        password_confirmation: '',
        referral_code: '',
        terms: ''
    });

    const [form] = Form.useForm();

    const passwordRules = [
        {
            required: true,
            message: "Please input your password!",
        },
        {
            max: 50,
            message: "Password should not exceed 50 characters",
        },
    ];

    const submit = () => {
        post('/register/stripeSession', {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            onSuccess: (page) => {
                //console.log(page.props.stripe_url);
                //console.log(data);
                localStorage.setItem('newUser', JSON.stringify(data));
                location.href = page.props.stripe_url;
            }
        });
    };

    return (
        <div className="login-page" id="loginPage">
            <Head title="Register" />

            <div className="login-form">
                <div className="login-form-header">
                    <img src={Logo} />
                </div>

                <Form
                    form={form}
                    name="register_form"
                    layout="vertical"
                    onFinish={submit}
                    autoComplete="off"
                    initialValues={data}
                    onFieldsChange={(changedFields) => {
                        changedFields.forEach(item => {
                            setData(item.name[0], item.value);
                        })
                    }}
                >
                    <div className='login-text-holder'>
                        <h1>Create a New Account</h1>
                        <p>Register with AERO CRM</p>
                    </div>

                    <Form.Item
                        name="profession"
                        validateStatus={errors.profession && 'error'}
                        help={errors.profession}
                        rules={[
                            {
                                required: true,
                                message: "Please select your Profession!",
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

                    <Form.Item
                        name="first_name"
                        validateStatus={errors.first_name && 'error'}
                        help={errors.first_name}
                        rules={[
                            {
                                required: true,
                                message: "Please input your First Name!",
                            }
                        ]}
                    >
                        <Input
                            size="large"
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            disabled={processing}
                            placeholder={"First Name"}
                        />
                    </Form.Item>

                    <Form.Item
                        name="last_name"
                        validateStatus={errors.last_name && 'error'}
                        help={errors.last_name}
                        rules={[
                            {
                                required: true,
                                message: "Please input your Last Name!",
                            }
                        ]}
                    >
                        <Input
                            size="large"
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            disabled={processing}
                            placeholder={"Last Name"}
                        />
                    </Form.Item>

                    <Form.Item
                        name="mobile"
                        validateStatus={errors.mobile && 'error'}
                        help={errors.mobile}
                        rules={[
                            {
                                required: true,
                                message: "Please input your Mobile No!",
                            }
                        ]}
                    >
                        <Input
                            size="large"
                            prefix={<PhoneOutlined className="site-form-item-icon" />}
                            disabled={processing}
                            placeholder={"Mobile No. Ex: +97150XXXXXXX"}
                        />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please input your E-mail!",
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
                        validateStatus={errors.email && 'error'}
                        help={errors.email}
                    >
                        <Input
                            size="large"
                            prefix={<MailOutlined className="site-form-item-icon" />}
                            disabled={processing}
                            placeholder={"Email Address"}
                            autoComplete="email"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={passwordRules}
                        validateStatus={errors.password && 'error'}
                        help={errors.password}
                    >
                        <Input.Password
                            size="large"
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            disabled={processing}
                            placeholder={"Password"}
                            autoComplete="current-password"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password_confirmation"
                        validateStatus={errors.password_confirmation && 'error'}
                        help={errors.password_confirmation}
                        rules={[
                            {
                                required: true,
                                message: "Please confirm your Password!",
                            }
                        ]}
                    >
                        <Input.Password
                            size="large"
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder={"Confirm Password"}
                            disabled={processing}
                            autoComplete="current-password"
                        />
                    </Form.Item>

                    <Form.Item
                        name="referral_code"
                        validateStatus={errors.referral_code && 'error'}
                        help={errors.referral_code}
                    >
                        <Input
                            size="large"
                            prefix={<CodeOutlined className="site-form-item-icon" />}
                            disabled={processing}
                            placeholder={"Referral Code"}
                        />
                    </Form.Item>

                    <Form.Item 
                        name="terms" 
                        valuePropName="checked"
                        validateStatus={errors.terms && 'error'}
                        help={errors.terms}
                        rules={[
                            {
                                required: true,
                                message: "You need to agree the Terms and Conditions",
                            }
                        ]}
                    >
                        <Radio> I agree the <a href='#'>Terms and Conditions</a> </Radio>
                    </Form.Item>

                    <Form.Item className="form-actions">
                        <Button type="primary" htmlType="submit" className="login-form-button" loading={processing} block>
                            {processing ? "Please Wait" : "Proceed to Payment"}
                        </Button>
                    </Form.Item>

                    <div className="form-register">
                        <Divider>{"or"}</Divider>
                        <Link href='/login'>Back to Login</Link>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Register;
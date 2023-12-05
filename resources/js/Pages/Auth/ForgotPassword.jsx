import React from 'react';
import { Head, useForm, Link, router } from "@inertiajs/react";
import { Button, Divider, Form, Input, message } from "antd";
import { MailOutlined } from "@ant-design/icons";

import Logo from "../../../../public/light-logo.png";

// import "./style.scss";

const ForgotPassword = () => {

    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const [form] = Form.useForm();

    const submit = () => {
        post('/forgot-password', {
            onSuccess: () => {
                message.success('Password Reset Link has been sent !')
            },
            onError: () => {
                message.error('There was an error processing your request. Please try again !')
            },
            onFinish: () => {
                router.get(`/login`)
            }
        });
    };

    return (
        <div className="login-page" id="loginPage">
            <Head title="Forgot Password" />

            <div className="login-form">
                <div className="login-form-header">
                    <img src={Logo} />
                </div>

                <Form 
                    form={form} 
                    name="forgotpassword" 
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
                        <h1>Reset Password</h1>
                        <p>Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.</p>
                    </div>

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

                    <Form.Item className="form-actions">
                        <Button type="primary" htmlType="submit" className="login-form-button" loading={processing} block>
                            {processing ? "Please Wait" : "Email Password Reset Link"}
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

export default ForgotPassword;
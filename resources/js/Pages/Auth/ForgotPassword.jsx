import React, { useState } from 'react';
import { Head, useForm, Link } from "@inertiajs/react";
import { Button, Divider, Form, Input, Typography } from "antd";
import { MailOutlined } from "@ant-design/icons";
import InputError from "@/Shared/InputError";

import Logo from "../../../../public/favicon.svg";

import "./style.scss";

const ForgotPassword = () => {

    const {post, errors} = useForm();

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = () => {
        setLoading(true);
        post(route("welcome"));
        setLoading(false);
    }

    return (
        <div className="login-page" id="loginPage">
            <Head title="Login" />

            <div className="login-form">
                <div className="login-form-header">
                    <img src={Logo} />
                </div>

                <InputError message={errors.email} />

                <Form form={form} name="login_form" layout="vertical" onFinish={onFinish} autoComplete="off">
                    <Typography.Title level={4}>{"Login to Your Account"}</Typography.Title>

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
                    >
                        <Input
                            size="large"
                            prefix={<MailOutlined className="site-form-item-icon" />}
                            disabled={loading}
                            placeholder={"Email Address"}
                            autoComplete="email"
                        />
                    </Form.Item>

                    <Form.Item className="form-actions">
                        <Button type="primary" htmlType="submit" className="login-form-button" loading={loading} block>
                            {loading ? "Please Wait" : "Login"}
                        </Button>
                    </Form.Item>

                    <div className="form-register">
                        <Divider>{"or"}</Divider>
                        <Link href={route('login')}>Back to Login</Link>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default ForgotPassword;
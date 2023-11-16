import React, { useEffect } from 'react';
import { Head, useForm, Link } from "@inertiajs/react";
import { Button, Divider, Form, Input } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";

import Logo from "../../../../public/light-logo.png";

import "./style.scss";

const Login = () => {

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = () => {
        post('/login');
    };

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

    return (
        <div className="login-page" id="loginPage">
            <Head title="Login" />

            <div className="login-form">
                <div className="login-form-header">
                    <img src={Logo} />
                </div>

                <Form
                    name="login"
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
                    <div className='login-text-holder'>
                        <h1>Sign-In</h1>
                        <p>Access the Aero RSP Panel using your Email and Password.</p>
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

                    <Form.Item className="form-actions">
                        <Button type="primary" htmlType="submit" className="login-form-button" loading={processing} block>
                            {processing ? "Please Wait" : "Log in"}
                        </Button>
                    </Form.Item>

                    <div className="form-forgot-password">
                        <Link href='/forgot-password'>Forgot Password?</Link>
                    </div>

                    <div className="form-register">
                        <Divider>{"or"}</Divider>
                        <Link href='/register'>Create A New Account</Link>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Login;
import React, { useEffect } from 'react';
import { Head, useForm, Link, router } from "@inertiajs/react";
import { Button, Divider, Form, Input, message } from "antd";
import { MailOutlined } from "@ant-design/icons";

import Logo from "../../../../public/light-logo.png";

import "./style.scss";

const ResetPassword = ({ token, email }) => {

    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const [form] = Form.useForm();

    const submit = () => {
        post('/reset-password', {
            onSuccess: () => {
                message.success('Password has been reset successfully !')
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
            <Head title="Reset Password" />

            <div className="login-form">
                <div className="login-form-header">
                    <img src={Logo} />
                </div>

                <Form 
                    form={form} 
                    name="resetpassword" 
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
                        <p>Choose a New Password</p>
                    </div>

                    <Form.Item
                        label="Email"
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
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "This field is required",
                            }
                        ]}
                        validateStatus={errors.password && 'error'}
                        help={errors.password}
                    >
                        <Input.Password autoComplete="new-password" />
                    </Form.Item>

                    <Form.Item
                        label="Confirm Password"
                        name="password_confirmation"
                        rules={[
                            {
                                required: true,
                                message: "This field is required",
                            }
                        ]}
                        validateStatus={errors.password_confirmation && 'error'}
                        help={errors.password_confirmation}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item className="form-actions">
                        <Button type="primary" htmlType="submit" className="login-form-button" loading={processing} block>
                            {processing ? "Please Wait" : "Reset Password"}
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

export default ResetPassword;
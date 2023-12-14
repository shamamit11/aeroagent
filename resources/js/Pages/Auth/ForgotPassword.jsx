import React from 'react';
import { Head, useForm, usePage, Link, router } from "@inertiajs/react";
import { Button, Divider, Form, Input, message } from "antd";
import { MailOutlined } from "@ant-design/icons";

import Logo from "../../../../public/light-logo.png";

const ForgotPassword = () => {
    const { lang } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const [form] = Form.useForm();

    const submit = () => {
        post('/forgot-password', {
            onSuccess: () => {
                message.success(lang.com.password_link_sent)
            },
            onError: () => {
                message.error(lang.com.error_request)
            },
            onFinish: () => {
                router.get(`/login`)
            }
        });
    };

    return (
        <div className="login-page" id="loginPage">
            <Head title={lang.com.forgot_password} />

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
                        <h1>{lang.com.reset_password}</h1>
                        <p>{lang.com.reset_password_text}</p>
                    </div>

                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: lang.loginPage.email_error_message_1,
                            },
                            {
                                type: "email",
                                message: lang.loginPage.email_error_message_2,
                            },
                            {
                                max: 50,
                                message: lang.loginPage.email_error_message_3,
                            },
                        ]}
                        validateStatus={errors.email && 'error'}
                        help={errors.email}
                    >
                        <Input
                            size="large"
                            prefix={<MailOutlined className="site-form-item-icon" />}
                            disabled={processing}
                            placeholder={lang.com.email_address}
                            autoComplete="email"
                        />
                    </Form.Item>

                    <Form.Item className="form-actions">
                        <Button type="primary" htmlType="submit" className="login-form-button" loading={processing} block>
                            {processing ? lang.com.please_wait : lang.com.email_password_reset_link}
                        </Button>
                    </Form.Item>

                    <div className="form-register">
                        <Divider>{lang.com.or_text}</Divider>
                        <Link href='/login'>{lang.com.back_to_login}</Link>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default ForgotPassword;
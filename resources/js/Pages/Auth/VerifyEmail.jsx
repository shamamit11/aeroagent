import React from 'react';
import { Head, useForm, Link, router } from "@inertiajs/react";
import { Button, Divider, Form, message, Alert } from "antd";

import Logo from "../../../../public/favicon.svg";

import "./style.scss";

const VerifyEmail = ({status}) => {

    const { post, processing } = useForm();

    const submit = () => {
        post('/email/verification-notification', {
            onSuccess: () => {
                message.success('A new verification link has been sent to the email address you provided during registration.')
            },
            onFinish: () => {
                router.get(`/login`)
            }
        });
    };

    return (
        <div className="login-page" id="loginPage">
            <Head title="Email Verification" />

            <div className="login-form">
                <div className="login-form-header">
                    <img src={Logo} />
                </div>

                <Form
                    name="emailverification" 
                    layout="vertical" 
                    onFinish={submit}
                    autoComplete="off"
                >

                    <div className='login-text-holder'>
                        <h1>Email Verification</h1>
                        <p>Thanks for signing up! Before getting started, could you verify your email address by clicking on the
                    link we just emailed to you? If you didn't receive the email, we will gladly send you another.</p>
                    </div>

                    {status === 'verification-link-sent' && (
                        <Alert
                            style={{ marginTop: 10, marginBottom: 10 }}
                            message="A new verification link has been sent to the email address you provided during registration."
                            type='success'
                        />
                    )}

                    <Form.Item className="form-actions">
                        <Button type="primary" htmlType="submit" className="login-form-button" loading={processing} block>
                            {processing ? "Please Wait" : "Resend Verification Link"}
                        </Button>
                    </Form.Item>

                    <div className="form-register">
                        <Divider>{"or"}</Divider>
                        <Link href='/logout' method="post">Logout</Link>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default VerifyEmail;
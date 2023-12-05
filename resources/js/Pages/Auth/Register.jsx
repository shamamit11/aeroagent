import React, { useState } from 'react';
import { Head, useForm, Link } from "@inertiajs/react";
import { Button, Divider, Form, Input, Select, Radio, Modal } from "antd";
import { LockOutlined, MailOutlined, PhoneOutlined, UserOutlined, CodeOutlined } from "@ant-design/icons";

import Logo from "../../../../public/light-logo.png";

// import "./style.scss";

const Register = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

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
                location.href = page.props.stripe_url;
            }
        });
    };

    const handleModal = () => {
        setIsModalOpen(true);
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
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
                            rules={[
                                {
                                    required: true,
                                    message: "Please Enter the Referral Code!",
                                }
                            ]}
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
                            <Radio> I agree the <a onClick={handleModal}>Terms and Conditions</a> </Radio>
                        </Form.Item>

                        <Form.Item className="form-actions">
                            <Button type="primary" htmlType="submit" className="login-form-button" loading={processing} block>
                                {processing ? "Please Wait" : "Proceed to Payment - AED 200"}
                            </Button>
                        </Form.Item>

                        <div className="form-register">
                            <Divider>{"or"}</Divider>
                            <Link href='/login'>Back to Login</Link>
                        </div>
                    </Form>
                </div>
            </div>

            <Modal title="Terms & Conditions" open={isModalOpen} onCancel={handleCancel} footer={null} width={1000}>
                <div>
                    <h3>Terms and Conditions – User Subscription </h3>
                    <p></p>
                    <p><strong>1. Acceptance of Terms</strong></p>
                    <p>
                        1.1 By accessing and using the subscription system provided by Aera Capital LLC hereinafter referred to as the "Service Provider," you agree to comply with and be bound by these Terms and Conditions.
                    </p>
                    <p><strong>2. Subscription Service</strong></p>
                    <p>
                        2.1 The Service Provider offers a subscription-based service ("Service") that allows users to (Use Aero Real Estate CRM to manage and organize their work with their clients and build a proper information structure).
                    </p>
                    <p>
                        2.2 Users must register for a subscription, and by doing so, agree to provide accurate, current, and complete information during the registration process.
                    </p>
                    <p><strong>3. Subscription Plans and Payments</strong></p>
                    <p>
                        3.1 Users will pay subscription fees offered by the Service Provider. Only 200 AED  Monthly to have full access of all the features which is available on aerorealestatecrm.com
                    </p>
                    <p>
                        3.2 Payments for subscription plans are processed in accordance with the chosen billing cycle (monthly). The user authorizes the Service Provider to charge the applicable fees to the chosen payment method.
                    </p>
                    <p>
                        3.3 The user is responsible for maintaining accurate payment information and ensuring timely payment of subscription fees.
                    </p>
                    <p><strong>4. Usage Policies</strong></p>
                    <p>
                        4.1 Users agree to use the subscription service in compliance with all applicable laws and regulations In UAE.
                    </p>
                    <p>
                        4.2 The user shall not engage in any conduct that may disrupt the functionality of the subscription system or compromise its security.
                    </p>
                    <p><strong>5. Termination</strong></p>
                    <p>
                        5.1 Either party may terminate the subscription with written notice via email in case of non-payment for the renewal fees and also The user is responsible for canceling their subscription before the next billing cycle to avoid additional charges.
                    </p>
                    <p>
                        5.2 The Service Provider reserves the right to suspend or terminate a user's subscription immediately and without notice in the event of a violation of these terms.
                    </p>
                    <p><strong>6. Privacy and Data Security</strong></p>
                    <p>
                        6.1 The Service Provider built Data protection Structure in terms of security to avoid any breach or any access to the user data in accordance with its Privacy Policy. It’s forbidden from the service provider to have any access to all the users data.
                    </p>
                    <p><strong>7. Intellectual Property</strong></p>
                    <p>
                        7.1 The user acknowledges that all content and intellectual property associated with the subscription service are owned by the Service Provider.
                    </p>
                    <p><strong>8. Limitation of Liability</strong></p>
                    <p>
                        8.1 The Service Provider shall not be liable for any direct, indirect, incidental, special, or consequential damages arising out of the use or inability to use the subscription service.
                    </p>
                    <p><strong>9. Modifications to Terms</strong></p>
                    <p>
                        9.1 The Service Provider reserves the right to modify these Terms and Conditions at any time. Users will be notified of changes, and continued use implies acceptance of the modified terms.
                    </p>
                    <p><strong>10. Governing Law</strong></p>
                    <p>
                        10.1 These Terms and Conditions are governed by the laws of United Arab Emirates.
                    </p>
                    <p></p>
                    <p></p>
                    <h3>Terms and Conditions – Affiliate Marketing </h3>
                    <p></p>
                    <p><strong>1. Relationship of Parties</strong></p>
                    <p>
                        1.1 This Agreement ("Agreement") is entered into by and between Aera Capital LLC , hereinafter referred to as the "Merchant," and [Affiliate Name], hereinafter referred to as the "Affiliate."
                    </p>
                    <p>
                        1.2 The Affiliate agrees to promote the Merchant's products/services in accordance with the terms and conditions set forth in this Agreement or use the Aero Real Estate CRM Features.
                    </p>
                    <p><strong>2. Commission Structure</strong></p>
                    <p>
                        2.1 The Merchant agrees to pay the Affiliate a commission based on [each subscription and renewal for Aero Real Estate CRM system under his profile  and for spreading the word of mouth of the company services starting from their social media pages and all platform till their latest project Qalaqs - the first UAE Market Place for Auto Spare Parts  - Amount of 100 AED will be paid per each transaction from the 200 AED Subscription And Renewal Fees] in definition for each qualifying sale generated through the Affiliate's unique tracking link.
                    </p>
                    <p><strong>3. Cookie Duration</strong></p>
                    <p>
                        3.1 The cookie duration is set at [ 30 days ], during which the Affiliate will receive credit for any customer purchases made after clicking on the affiliate link.
                    </p>
                    <p><strong>4. Payment Terms</strong></p>
                    <p>
                        4.1 Payments will be made [monthly after the renewal date with 1 to 2 days and the cutoff date for calculating the payout  will be on 25th of each month].
                    </p>
                    <p>
                        4.2 Payments will be made via [Bank Transfer Or Money Transfer Channels].
                    </p>
                    <p><strong>5. Promotional Methods</strong></p>
                    <p>
                        5.1 The Affiliate agrees to promote the Merchant's products/services using ethical and legal means.
                    </p>
                    <p>
                        5.2 Prohibited promotional methods include [list prohibited methods such as spam, false advertising, etc.].
                    </p>
                    <p><strong>6. Brand Guidelines</strong></p>
                    <p>
                        6.1 The Affiliate agrees to adhere to the Merchant's branding and trademark usage guidelines provided.
                    </p>
                    <p><strong>7. Termination Clause</strong></p>
                    <p>
                        7.1 Either party may terminate this Agreement with written notice if the other party breaches any material term or condition of this Agreement.
                    </p>
                    <p><strong>8. UAE Compliance</strong></p>
                    <p>
                        8.1 The Affiliate agrees to comply with all UAE Promoting guidelines regarding the disclosure of their affiliate relationship when promoting the Merchant's products/services.
                    </p>
                    <p><strong>9. Confidentiality</strong></p>
                    <p>
                        9.1 The Affiliate agrees to keep confidential any non-public information shared by the Merchant.
                    </p>
                    <p><strong>10. Liability</strong></p>
                    <p>
                        10.1 Each party shall be liable for its own actions and shall not hold the other party liable for any indirect, special, or consequential damages.
                    </p>
                    <p><strong>11. Modification Clause</strong></p>
                    <p>
                        11.1 The Merchant reserves the right to modify these terms and conditions. Affiliates will be notified of any changes, and continued participation implies acceptance of the modified terms.
                    </p>
                </div>
            </Modal>
        </>
    );
};

export default Register;
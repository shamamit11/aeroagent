import React, { useState } from 'react';
import AffiliateLayout from '@/Layouts/AffiliateLayout';
import { Head, router } from "@inertiajs/react";
import { Button, Col, Row, Space, Card, Alert, Modal, message } from 'antd';

const Index = (props) => {
    const { next_renewal_date, balance, lang } = props;
    const alertMessage = lang.com.subscription_expired + " : " + next_renewal_date;
    const alertBalance = lang.com.wallet_balance_text + " : AED " + balance;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleStripePayment = () => {
        router.post('/generate-stripe-session', {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        });
    }

    const handleWalletPayment = () => {
        setIsModalOpen(false);
        
        router.post('/pay-through-wallet', {
            onSuccess: () => {
                message.success(lang.com.subscription_renewed)
                router.get('/')
            },
            onError: () => {
                message.error(lang.com.error_request)
            },
            onFinish: () => {
                router.get('/')
            }
        });
    }

    const handleModal = () => {
        setIsModalOpen(true);
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Head title={lang.com.renew_subscription} />
            <Row justify={'space-between'} align={'middle'} style={{ marginBottom: 20 }}>
                <Col>
                    <span className='page-title'>{lang.com.renew_subscription}</span>
                </Col>
            </Row>

            <Alert message={alertMessage} type="error" />
            <br />
            <Alert message={alertBalance} type="warning" />

            <Card style={{ marginTop: 20 }}>
                <Row>
                    <Space size="large">
                        {balance >= 200 && (
                            <Col><Button size='large' onClick={handleModal}>{lang.com.pay_using_wallet}</Button></Col>
                        )}
                        <Col>
                            <Button size='large' onClick={handleStripePayment}>{lang.com.pay_through_cc}</Button>
                        </Col>
                    </Space>
                </Row>
            </Card>

            <Modal title="Pay Using Wallet Balance" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <div style={{ fontSize: 16, fontWeight: 500, lineHeight: 2 }}>
                    {lang.com.current_wallet_balance} : AED {balance}
                    <br />
                    {lang.com.remaining_balance_text} : AED {balance - 200}
                </div>
                <div style={{ marginTop: 15 }}>
                    <Button type="primary" size='large' onClick={handleWalletPayment}>{lang.com.confirm_pay}</Button>
                </div>

            </Modal>
        </>
    );
};

Index.layout = page => <AffiliateLayout children={page} />

export default Index;
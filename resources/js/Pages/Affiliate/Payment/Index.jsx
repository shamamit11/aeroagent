import React, { useState } from 'react';
import AffiliateLayout from '@/Layouts/AffiliateLayout';
import { Head, router } from "@inertiajs/react";
import { Button, Col, Row, Space, Card, Alert, Modal, message } from 'antd';

const Index = (props) => {
    const { next_renewal_date, balance } = props;
    const alertMessage = "Your subscription expired on: " + next_renewal_date;
    const alertBalance = "Your Wallet Balance is: AED " + balance;

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
                message.success('Subscription Renewed Successfully !')
                router.get('/')
            },
            onError: () => {
                message.error('There was an error processing your request. Please try again !')
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
            <Head title="Renew Subscription" />
            <Row justify={'space-between'} align={'middle'} style={{ marginBottom: 20 }}>
                <Col>
                    <span className='page-title'>Renew Subscription</span>
                </Col>
            </Row>

            <Alert message={alertMessage} type="error" />
            <br />
            <Alert message={alertBalance} type="warning" />

            <Card style={{ marginTop: 20 }}>
                <Row>
                    <Space size="large">
                        {balance >= 200 && (
                            <Col><Button size='large' onClick={handleModal}>Pay using Wallet Balance</Button></Col>
                        )}
                        <Col>
                            <Button size='large' onClick={handleStripePayment}>Pay using Stripe</Button>
                        </Col>
                    </Space>
                </Row>
            </Card>

            <Modal title="Pay Using Wallet Balance" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <div style={{ fontSize: 16, fontWeight: 500, lineHeight: 2 }}>
                    Your current Wallet Balance is: AED {balance}
                    <br />
                    Remaining Balance after renewal: AED {balance - 200}
                </div>
                <div style={{ marginTop: 15 }}>
                    <Button type="primary" size='large' onClick={handleWalletPayment}>Confirm & Pay Now</Button>
                </div>

            </Modal>
        </>
    );
};

Index.layout = page => <AffiliateLayout children={page} />

export default Index;
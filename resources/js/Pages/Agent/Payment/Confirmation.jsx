import React from 'react';
import AgentLayout from '@/Layouts/AgentLayout';
import { Head, router, usePage } from "@inertiajs/react";
import { Button, Col, Row, Space, Card, Alert } from 'antd';

const Confirmation = () => {
    const {lang} = usePage().props;

    const alertMessage = lang.com.renewed_message;

    const handleProceed = () => {
        router.get('/');
    }

    return (
        <>
            <Head title={lang.com.payment_confirmation} />
            <Row justify={'space-between'} align={'middle'} style={{ marginBottom: 20 }}>
                <Col>
                    <span className='page-title'>{lang.com.payment_confirmation}</span>
                </Col>
            </Row>

            <Alert message={alertMessage} type="success" />

            <Card style={{marginTop: 20}}>
                <Row>
                    <Space size="large">
                        <Col>
                            <Button size='large' onClick={handleProceed}>{lang.com.proceed}</Button>
                        </Col>
                    </Space>
                </Row>
            </Card>

        </>
    );
};

Confirmation.layout = page => <AgentLayout children={page} />

export default Confirmation;
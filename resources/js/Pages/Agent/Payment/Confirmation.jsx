import React from 'react';
import AgentLayout from '@/Layouts/AgentLayout';
import { Head, router } from "@inertiajs/react";
import { Button, Col, Row, Space, Card, Alert } from 'antd';

import "./style.scss";

const Confirmation = () => {

    const alertMessage = "You have renewed your Subscription Successfully ! ";

    const handleProceed = () => {
        router.get('/');
    }

    return (
        <>
            <Head title="Payment Confirmation" />
            <Row justify={'space-between'} align={'middle'} style={{ marginBottom: 20 }}>
                <Col>
                    <span className='page-title'>Payment Confirmation</span>
                </Col>
            </Row>

            <Alert message={alertMessage} type="success" />

            <Card style={{marginTop: 20}}>
                <Row>
                    <Space size="large">
                        <Col>
                            <Button size='large' onClick={handleProceed}>Proceed</Button>
                        </Col>
                    </Space>
                </Row>
            </Card>

        </>
    );
};

Confirmation.layout = page => <AgentLayout children={page} />

export default Confirmation;
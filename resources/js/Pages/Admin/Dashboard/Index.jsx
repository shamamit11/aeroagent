import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from "@inertiajs/react";
import { Card, Col, Row, Statistic } from 'antd';

import "./style.scss";


const Dashboard = (props) => {

    return (
        <>
            <Head title="Dashboard" />
            <Card title={`Welcome, ${props.auth.user.first_name}`}>

                <Row gutter={24}>
                    <Col span={4}>
                        <Card bordered={false}>
                            <Statistic
                                title="Total Agents"
                                value={props.agents}
                                valueStyle={{
                                    color: '#3f8600',
                                }}
                            />
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card bordered={false}>
                            <Statistic
                                title="Total Affiliates"
                                value={props.affiliate}
                                valueStyle={{
                                    color: 'skyblue',
                                }}
                            />
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card bordered={false}>
                            <Statistic
                                title="Today's Payout"
                                value={props.payout}
                                valueStyle={{
                                    color: 'skyblue',
                                }}
                            />
                        </Card>
                    </Col>
                </Row>
            </Card>
        </>
    );
};

Dashboard.layout = page => <AdminLayout children={page} />

export default Dashboard;
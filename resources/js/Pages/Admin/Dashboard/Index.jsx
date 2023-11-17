import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from "@inertiajs/react";
import { Card, Col, Row, Statistic, Button } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';

import "./style.scss";


const Dashboard = (props) => {
   //console.log(props)

    const viewWallet = () => {
        router.get('/wallet')
    }

    const viewReferral = () => {
        router.get('/referral')
    }

    const viewPayout = () => {
        router.get('/wallet/payout')
    }

    const viewRenewal = () => {
        router.get('/wallet/renewal')
    }
    

    return (
        <>
            <Head title="Dashboard" />
            <Card title={`Welcome, ${props.auth.user.first_name}`}>

                <Row gutter={24}>
                    <Col span={4}>
                        <Card bordered={false}>
                            <Statistic
                                title="Total Agents"
                                value={props.balance}
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
                                value={props.totalReferral}
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
import AffiliateLayout from '@/Layouts/AffiliateLayout';
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
            <Card title={`Your Referral Code is: ${props.auth.user.user_code}`}>

                <Row gutter={24}>
                    <Col span={6}>
                        <Card bordered={false}>
                            <Statistic
                                title="Wallet Balance (AED)"
                                value={props.balance}
                                precision={2}
                                valueStyle={{
                                    color: '#3f8600',
                                }}
                            />
                            <Button
                                style={{
                                    marginTop: 16,
                                    color: "green", 
                                    borderColor: "green"
                                }}
                                onClick={viewWallet}
                            >
                                View Wallet
                            </Button>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card bordered={false}>
                            <Statistic
                                title="Total Referrals"
                                value={props.totalReferral}
                                valueStyle={{
                                    color: 'skyblue',
                                }}
                            />
                            <Button
                                style={{
                                    marginTop: 16,
                                    color: "skyblue", 
                                    borderColor: "skyblue"
                                }}
                                onClick={viewReferral}
                            >
                                View Referrals
                            </Button>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card bordered={false}>
                            <Statistic
                                title="Total Payout (AED)"
                                value={props.totalPayout}
                                precision={2}
                                valueStyle={{
                                    color: 'orange',
                                }}
                            />
                            <Button
                                style={{
                                    marginTop: 16,
                                    color: "orange", 
                                    borderColor: "orange"
                                }}
                                onClick={viewPayout}
                            >
                                View Payouts
                            </Button>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card bordered={false}>
                            <Statistic
                                title="Next Renewal After"
                                value={props.nextRenewalDate}
                                valueStyle={{
                                    color: '#cf1322',
                                }}
                            />
                            <Button
                                style={{
                                    marginTop: 16,
                                    color: "#cf1322", 
                                    borderColor: "#cf1322"
                                }}
                                onClick={viewRenewal}
                            >
                                View Renewals
                            </Button>
                        </Card>
                    </Col>
                </Row>
            </Card>
        </>
    );
};

Dashboard.layout = page => <AffiliateLayout children={page} />

export default Dashboard;
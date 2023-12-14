import AffiliateLayout from '@/Layouts/AffiliateLayout';
import { Head, router, usePage } from "@inertiajs/react";
import { Card, Col, Row, Statistic, Button } from 'antd';

const Dashboard = (props) => {
    const { lang } = usePage().props;

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
           <Head title={lang.com.wallet} />
           <Card title={`${lang.com.your_referral_code_is}: ${props.auth.user.user_code}`}>
                <Row gutter={24}>
                    <Col span={6}>
                        <Card bordered={false}>
                            <Statistic
                                title={lang.com.wallet_balance + " (AED)"}
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
                                {lang.com.view_wallet}
                            </Button>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card bordered={false}>
                            <Statistic
                                title={lang.com.total_referrals}
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
                                {lang.com.view_referrals}
                            </Button>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card bordered={false}>
                            <Statistic
                                title={lang.com.total_payout + " (AED)"}
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
                                {lang.com.view_payouts}
                            </Button>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card bordered={false}>
                            <Statistic
                                title={lang.com.next_renewal_after}
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
                                {lang.com.view_renewals}
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
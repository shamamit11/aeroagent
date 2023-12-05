import AgentLayout from '@/Layouts/AgentLayout';
import { Head, router, usePage } from "@inertiajs/react";
import { Card, Col, Row, Statistic, Button } from 'antd';

const WalletDashboard = (props) => {
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
            <Head title={lang.menuItems.wallet} />
            <Card title={`${lang.wallet.your_referral_code_is}: ${props.auth.user.user_code}`}>

                <Row gutter={24}>
                    <Col span={6}>
                        <Card bordered={false}>
                            <Statistic
                                title={lang.wallet.wallet_balance + " AED"}
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
                                {lang.wallet.view_wallet}
                            </Button>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card bordered={false}>
                            <Statistic
                                title={lang.wallet.total_referrals}
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
                                {lang.wallet.view_referrals}
                            </Button>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card bordered={false}>
                            <Statistic
                                title={lang.wallet.total_payout + " AED"}
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
                                {lang.wallet.view_payouts}
                            </Button>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card bordered={false}>
                            <Statistic
                                title={lang.wallet.next_renewal_after}
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
                                {lang.wallet.view_renewals}
                            </Button>
                        </Card>
                    </Col>
                </Row>
            </Card>
        </>
    );
};

WalletDashboard.layout = page => <AgentLayout children={page} />

export default WalletDashboard;
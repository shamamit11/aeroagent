import React from 'react';
import dayjs from 'dayjs';
import AgentLayout from '@/Layouts/AgentLayout';
import { Head, router, Link, usePage } from "@inertiajs/react";
import { Card, Col, Row, Statistic, DatePicker, Space } from 'antd';

const { RangePicker } = DatePicker;

const Dashboard = (props) => {
    const { lang } = usePage().props;

    const onChange = (date, dateString) => {
        router.get(`/dashboard?date_range=${dateString}`)
    };

    const RangeComponent = () => {
        return (
            <>
                <Space size="middle">
                    <span>{lang.com.select_range} : </span>
                    <RangePicker defaultValue={[dayjs(props.date_from), dayjs(props.date_to)]} onChange={onChange} />
                </Space>
            </>

        )
    }

    return (
        <>
            <Head title={lang.com.dashboard} />

            <Card title={lang.com.stats} extra={<RangeComponent />}>
                <Row gutter={24}>
                    <Col span={4} style={{ marginBottom: 24 }}>
                        <Link href={props.followup.followup_url}>
                            <Card bordered={false} style={{ backgroundColor: '#76c52f' }}>
                                <Statistic
                                    title={lang.com.follow_ups}
                                    value={props.followup.followup_count}
                                    valueStyle={{
                                        color: '#fff',
                                    }}
                                />
                            </Card>
                        </Link>
                    </Col>


                    <Col span={4}>
                        <Link href={props.viewing.viewing_url}>
                            <Card bordered={false} style={{ backgroundColor: 'skyblue' }}>
                                <Statistic
                                    title={lang.com.viewings}
                                    value={props.viewing.viewing_count}
                                    valueStyle={{
                                        color: '#fff',
                                    }}
                                />
                            </Card>
                        </Link>
                    </Col>


                    <Col span={4}>
                        <Link href={props.meeting.meeting_url}>
                            <Card bordered={false} style={{ backgroundColor: 'orange' }}>
                                <Statistic
                                    title={lang.com.meetings}
                                    value={props.meeting.meeting_count}
                                    valueStyle={{
                                        color: '#fff',
                                    }}
                                />
                            </Card>
                        </Link>
                    </Col>
                </Row>
            </Card>

            <Card title={lang.com.total_deals} style={{ marginTop: 25 }}>
                <Row gutter={24}>
                    <Col span={4} style={{ marginBottom: 24 }}>
                        <Link href={props.seller_deal.url}>
                            <Card bordered={false} style={{ backgroundColor: '#3dda03' }}>
                                <Statistic
                                    title={lang.com.sellers}
                                    value={props.seller_deal.count}
                                    valueStyle={{
                                        color: '#fff',
                                    }}
                                />
                            </Card>
                        </Link>
                    </Col>
                    <Col span={4} style={{ marginBottom: 24 }}>
                        <Link href={props.buyer_deal.url}>
                            <Card bordered={false} style={{ backgroundColor: '#e04e4e' }}>
                                <Statistic
                                    title={lang.com.buyers}
                                    value={props.buyer_deal.count}
                                    valueStyle={{
                                        color: '#fff',
                                    }}
                                />
                            </Card>
                        </Link>
                    </Col>
                    <Col span={4} style={{ marginBottom: 24 }}>
                        <Link href={props.leaser_deal.url}>
                            <Card bordered={false} style={{ backgroundColor: '#bb79da' }}>
                                <Statistic
                                    title={lang.com.leasers}
                                    value={props.leaser_deal.count}
                                    valueStyle={{
                                        color: '#fff',
                                    }}
                                />
                            </Card>
                        </Link>
                    </Col>
                    <Col span={4} style={{ marginBottom: 24 }}>
                        <Link href={props.tenant_deal.url}>
                            <Card bordered={false} style={{ backgroundColor: '#e49527' }}>
                                <Statistic
                                    title={lang.com.tenants}
                                    value={props.tenant_deal.count}
                                    valueStyle={{
                                        color: '#fff',
                                    }}
                                />
                            </Card>
                        </Link>
                    </Col>
                </Row>
            </Card>

            <Card title={lang.com.total_requests} style={{ marginTop: 25 }}>
                <Row gutter={24}>
                    <Col span={4} style={{ marginBottom: 24 }}>
                        <Link href="/request-seller">
                            <Card bordered={false} style={{ backgroundColor: '#b373b3' }}>
                                <Statistic
                                    title={lang.com.sellers}
                                    value={props.seller_request}
                                    valueStyle={{
                                        color: '#fff',
                                    }}
                                />
                            </Card>
                        </Link>
                    </Col>
                    <Col span={4} style={{ marginBottom: 24 }}>
                        <Link href="/request-buyer">
                            <Card bordered={false} style={{ backgroundColor: '#e5b34e' }}>
                                <Statistic
                                    title={lang.com.buyers}
                                    value={props.buyer_request}
                                    valueStyle={{
                                        color: '#fff',
                                    }}
                                />
                            </Card>
                        </Link>
                    </Col>
                    <Col span={4} style={{ marginBottom: 24 }}>
                        <Link href="/request-leaser">
                            <Card bordered={false} style={{ backgroundColor: '#1fadad' }}>
                                <Statistic
                                    title={lang.com.leasers}
                                    value={props.leaser_request}
                                    valueStyle={{
                                        color: '#fff',
                                    }}
                                />
                            </Card>
                        </Link>
                    </Col>
                    <Col span={4} style={{ marginBottom: 24 }}>
                        <Link href="/request-tenant">
                            <Card bordered={false} style={{ backgroundColor: '#bbbbbb' }}>
                                <Statistic
                                    title={lang.com.tenants}
                                    value={props.tenant_request}
                                    valueStyle={{
                                        color: '#fff',
                                    }}
                                />
                            </Card>
                        </Link>
                    </Col>
                </Row>
            </Card>

            <Card title={lang.com.property_stats} style={{ marginTop: 25 }}>
                <Row gutter={24}>
                    <Col span={4} style={{ marginBottom: 24 }}>
                        <Link href={props.stock_apartment.url}>
                            <Card bordered={false} style={{ backgroundColor: '#bbbbbb' }}>
                                <Statistic
                                    title={lang.com.apartments}
                                    value={props.stock_apartment.count}
                                    valueStyle={{
                                        color: '#fff',
                                    }}
                                />
                            </Card>
                        </Link>
                    </Col>


                    <Col span={4}>
                        <Link href={props.stock_villa.url}>
                            <Card bordered={false} style={{ backgroundColor: '#ca2c2c' }}>
                                <Statistic
                                    title={lang.com.villas}
                                    value={props.stock_villa.count}
                                    valueStyle={{
                                        color: '#fff',
                                    }}
                                />
                            </Card>
                        </Link>
                    </Col>


                    <Col span={4}>
                        <Link href={props.stock_townhouse.url}>
                            <Card bordered={false} style={{ backgroundColor: '#6ec4d7' }}>
                                <Statistic
                                    title={lang.com.townhouses}
                                    value={props.stock_townhouse.count}
                                    valueStyle={{
                                        color: '#fff',
                                    }}
                                />
                            </Card>
                        </Link>
                    </Col>

                    <Col span={4}>
                        <Link href={props.stock_penthouse.url}>
                            <Card bordered={false} style={{ backgroundColor: '#b373b3' }}>
                                <Statistic
                                    title={lang.com.penthouses}
                                    value={props.stock_penthouse.count}
                                    valueStyle={{
                                        color: '#fff',
                                    }}
                                />
                            </Card>
                        </Link>
                    </Col>

                    <Col span={4}>
                        <Link href={props.stock_office.url}>
                            <Card bordered={false} style={{ backgroundColor: '#e773e7' }}>
                                <Statistic
                                    title={lang.com.offices}
                                    value={props.stock_office.count}
                                    valueStyle={{
                                        color: '#fff',
                                    }}
                                />
                            </Card>
                        </Link>
                    </Col>

                    <Col span={4}>
                        <Link href={props.stock_retail.url}>
                            <Card bordered={false} style={{ backgroundColor: 'pink' }}>
                                <Statistic
                                    title={lang.com.retail_shops}
                                    value={props.stock_retail.count}
                                    valueStyle={{
                                        color: '#fff',
                                    }}
                                />
                            </Card>
                        </Link>
                    </Col>

                    <Col span={4}>
                        <Link href={props.stock_land.url}>
                            <Card bordered={false} style={{ backgroundColor: '#1fadad' }}>
                                <Statistic
                                    title={lang.com.lands}
                                    value={props.stock_land.count}
                                    valueStyle={{
                                        color: '#fff',
                                    }}
                                />
                            </Card>
                        </Link>
                    </Col>

                    <Col span={4}>
                        <Link href={props.stock_factory.url}>
                            <Card bordered={false} style={{ backgroundColor: '#e5b34e' }}>
                                <Statistic
                                    title={lang.com.factory}
                                    value={props.stock_factory.count}
                                    valueStyle={{
                                        color: '#fff',
                                    }}
                                />
                            </Card>
                        </Link>
                    </Col>

                    <Col span={4}>
                        <Link href={props.stock_hotel.url}>
                            <Card bordered={false} style={{ backgroundColor: '#737add' }}>
                                <Statistic
                                    title={lang.com.hotel_apartments}
                                    value={props.stock_hotel.count}
                                    valueStyle={{
                                        color: '#fff',
                                    }}
                                />
                            </Card>
                        </Link>
                    </Col>
                </Row>
            </Card>
        </>
    );
};

Dashboard.layout = page => <AgentLayout children={page} />

export default Dashboard;
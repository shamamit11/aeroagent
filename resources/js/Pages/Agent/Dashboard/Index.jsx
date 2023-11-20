import React from 'react';
import dayjs from 'dayjs';
import AgentLayout from '@/Layouts/AgentLayout';
import { Head, router, Link } from "@inertiajs/react";
import { Card, Col, Row, Statistic, DatePicker, Space } from 'antd';

const { RangePicker } = DatePicker;

const Dashboard = (props) => {
    const onChange = (date, dateString) => {
        router.get(`/dashboard?date_range=${dateString}`)
    };

    const RangeComponent = () => {
        return (
            <>
                <Space size="middle">
                    <span>Select Range: </span>
                    <RangePicker defaultValue={[dayjs(props.date_from), dayjs(props.date_to)]}  onChange={onChange} />
                </Space>
            </>

        )
    }

    return (
        <>
            <Head title="Dashboard" />

            <Card title={`Stats`} extra={<RangeComponent />}>
                <Row gutter={24}>
                    <Col span={4} style={{marginBottom: 24}}>
                        <Link href={props.followup.followup_url}>
                            <Card bordered={false} style={{ backgroundColor: '#76c52f' }}>
                                <Statistic
                                    title="Followups"
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
                                    title="Viewings"
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
                                    title="Meetings"
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

            <Card title={`Deals`} style={{ marginTop: 25}}>
            <Row gutter={24}>
                    <Col span={4} style={{marginBottom: 24}}>
                        <Link href={props.seller_deal.url}>
                            <Card bordered={false} style={{ backgroundColor: '#3dda03' }}>
                                <Statistic
                                    title="Total Deals - Sellers"
                                    value={props.seller_deal.count}
                                    valueStyle={{
                                        color: '#fff',
                                    }}
                                />
                            </Card>
                        </Link>
                    </Col>
                    <Col span={4} style={{marginBottom: 24}}>
                        <Link href={props.buyer_deal.url}>
                            <Card bordered={false} style={{ backgroundColor: '#e04e4e' }}>
                                <Statistic
                                    title="Total Deals - Buyers"
                                    value={props.buyer_deal.count}
                                    valueStyle={{
                                        color: '#fff',
                                    }}
                                />
                            </Card>
                        </Link>
                    </Col>
                    <Col span={4} style={{marginBottom: 24}}>
                        <Link href={props.leaser_deal.url}>
                            <Card bordered={false} style={{ backgroundColor: '#bb79da' }}>
                                <Statistic
                                    title="Total Deals - Leasers"
                                    value={props.leaser_deal.count}
                                    valueStyle={{
                                        color: '#fff',
                                    }}
                                />
                            </Card>
                        </Link>
                    </Col>
                    <Col span={4} style={{marginBottom: 24}}>
                        <Link href={props.tenant_deal.url}>
                            <Card bordered={false} style={{ backgroundColor: '#e49527' }}>
                                <Statistic
                                    title="Total Deals - Tenants"
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

            <Card title={`Requests`} style={{ marginTop: 25}}>
                <Row gutter={24}>
                    <Col span={4} style={{marginBottom: 24}}>
                        <Link href="/request-seller">
                            <Card bordered={false} style={{ backgroundColor: '#b373b3' }}>
                                <Statistic
                                    title="Seller Requests"
                                    value={props.seller_request}
                                    valueStyle={{
                                        color: '#fff',
                                    }}
                                />
                            </Card>
                        </Link>
                    </Col>
                    <Col span={4} style={{marginBottom: 24}}>
                        <Link href="/request-buyer">
                            <Card bordered={false} style={{ backgroundColor: '#e5b34e' }}>
                                <Statistic
                                    title="Buyer Requests"
                                    value={props.buyer_request}
                                    valueStyle={{
                                        color: '#fff',
                                    }}
                                />
                            </Card>
                        </Link>
                    </Col>
                    <Col span={4} style={{marginBottom: 24}}>
                        <Link href="/request-leaser">
                            <Card bordered={false} style={{ backgroundColor: '#1fadad' }}>
                                <Statistic
                                    title="Leaser Requests"
                                    value={props.leaser_request}
                                    valueStyle={{
                                        color: '#fff',
                                    }}
                                />
                            </Card>
                        </Link>
                    </Col>
                    <Col span={4} style={{marginBottom: 24}}>
                        <Link href="/request-tenant">
                            <Card bordered={false} style={{ backgroundColor: '#bbbbbb' }}>
                                <Statistic
                                    title="Tenant Requests"
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

            <Card title={`Property Stats`} style={{ marginTop: 25}}>
                <Row gutter={24}>
                    <Col span={4} style={{marginBottom: 24}}>
                        <Link href={props.stock_apartment.url}>
                            <Card bordered={false} style={{ backgroundColor: '#bbbbbb' }}>
                                <Statistic
                                    title="Apartments"
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
                                    title="Villas"
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
                                    title="Town Houses"
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
                                    title="Pent Houses"
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
                                    title="Offices"
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
                                    title="Retail / Shops"
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
                                    title="Lands"
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
                                    title="Factory"
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
                                    title="Hotel Apartments"
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
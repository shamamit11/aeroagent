import React from 'react';
import dayjs from 'dayjs';
import AgentLayout from '@/Layouts/AgentLayout';
import { Head, router, Link } from "@inertiajs/react";
import { Card, Col, Row, Statistic, Button, DatePicker, Space } from 'antd';
import "./style.scss";

const { RangePicker } = DatePicker;

const Dashboard = (props) => {
    console.log(props)

    const onChange = (dateString) => {
        console.log(dateString[0]);
    };

    const RangeComponent = () => {
        return (
            <>
                <Space size="middle">
                    <span>Select Range: </span>
                    <RangePicker defaultValue={[dayjs(), dayjs()]}  onChange={onChange} />
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
                        <Link>
                            <Card bordered={false} style={{ backgroundColor: '#76c52f' }}>
                                <Statistic
                                    title="Followups"
                                    value={props.balance}
                                    valueStyle={{
                                        color: '#fff',
                                    }}
                                />
                            </Card>
                        </Link>
                    </Col>


                    <Col span={4}>
                        <Link>
                            <Card bordered={false} style={{ backgroundColor: 'skyblue' }}>
                                <Statistic
                                    title="Viewings"
                                    value={props.balance}
                                    valueStyle={{
                                        color: '#fff',
                                    }}
                                />
                            </Card>
                        </Link>
                    </Col>


                    <Col span={4}>
                        <Link>
                            <Card bordered={false} style={{ backgroundColor: 'orange' }}>
                                <Statistic
                                    title="Meetings"
                                    value={props.balance}
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
                        <Link>
                            <Card bordered={false} style={{ backgroundColor: '#bbbbbb' }}>
                                <Statistic
                                    title="Apartments"
                                    value={props.balance}
                                    valueStyle={{
                                        color: '#fff',
                                    }}
                                />
                            </Card>
                        </Link>
                    </Col>


                    <Col span={4}>
                        <Link>
                            <Card bordered={false} style={{ backgroundColor: '#ca2c2c' }}>
                                <Statistic
                                    title="Villas"
                                    value={props.balance}
                                    valueStyle={{
                                        color: '#fff',
                                    }}
                                />
                            </Card>
                        </Link>
                    </Col>


                    <Col span={4}>
                        <Link>
                            <Card bordered={false} style={{ backgroundColor: '#6ec4d7' }}>
                                <Statistic
                                    title="Town Houses"
                                    value={props.balance}
                                    valueStyle={{
                                        color: '#fff',
                                    }}
                                />
                            </Card>
                        </Link>
                    </Col>

                    <Col span={4}>
                        <Link>
                            <Card bordered={false} style={{ backgroundColor: '#b373b3' }}>
                                <Statistic
                                    title="Pent Houses"
                                    value={props.balance}
                                    valueStyle={{
                                        color: '#fff',
                                    }}
                                />
                            </Card>
                        </Link>
                    </Col>

                    <Col span={4}>
                        <Link>
                            <Card bordered={false} style={{ backgroundColor: '#e773e7' }}>
                                <Statistic
                                    title="Offices"
                                    value={props.balance}
                                    valueStyle={{
                                        color: '#fff',
                                    }}
                                />
                            </Card>
                        </Link>
                    </Col>

                    <Col span={4}>
                        <Link>
                            <Card bordered={false} style={{ backgroundColor: 'pink' }}>
                                <Statistic
                                    title="Retail / Shops"
                                    value={props.balance}
                                    valueStyle={{
                                        color: '#fff',
                                    }}
                                />
                            </Card>
                        </Link>
                    </Col>

                    <Col span={4}>
                        <Link>
                            <Card bordered={false} style={{ backgroundColor: '#1fadad' }}>
                                <Statistic
                                    title="Lands"
                                    value={props.balance}
                                    valueStyle={{
                                        color: '#fff',
                                    }}
                                />
                            </Card>
                        </Link>
                    </Col>

                    <Col span={4}>
                        <Link>
                            <Card bordered={false} style={{ backgroundColor: '#e5b34e' }}>
                                <Statistic
                                    title="Factory"
                                    value={props.balance}
                                    valueStyle={{
                                        color: '#fff',
                                    }}
                                />
                            </Card>
                        </Link>
                    </Col>

                    <Col span={4}>
                        <Link>
                            <Card bordered={false} style={{ backgroundColor: '#737add' }}>
                                <Statistic
                                    title="Hotel Apartments"
                                    value={props.balance}
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
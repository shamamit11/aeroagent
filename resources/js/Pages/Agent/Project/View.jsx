import React from 'react';
import AgentLayout from '@/Layouts/AgentLayout';
import { Head, usePage, router } from "@inertiajs/react";
import { Card, Col, Button, Row, Tabs } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import TabInfo from './Partials/TabInfo';
import TabDetail from './Partials/TabDetail';
import TabDoc from './Partials/TabDoc';

const View = () => {
    const props = usePage().props;
    const { lang } = usePage().props;
    const rowData = props.row;

    const handleBack = () => {
        router.get('/project')
    }

    const items = [
        {
            key: '1',
            label: lang.com.info,
            children: <TabInfo />,
        },
        {
            key: '2',
            label: lang.com.details,
            children: <TabDetail />,
        },
        {
            key: '3',
            label: lang.com.documents,
            children: <TabDoc />,
        },
    ];

    return (
        <Card bordered={false} style={{ width: "100%", borderRadius: 0, paddingBottom: 20 }}>
            <Head title={rowData.name} />
            
            <Row justify={'space-between'} align={'middle'} style={{ marginBottom: 20, marginTop: 5 }}>
                <Col>
                    <span className='page-title'>{rowData.name}</span>
                </Col>
                <Col>
                    <Button style={{ color: "blue", borderColor: "blue" }} shape="circle" icon={<ArrowLeftOutlined />} size={"middle"} onClick={handleBack} />
                </Col>
            </Row>

            <Tabs defaultActiveKey="1" items={items} />
        </Card>
    );
};

View.layout = page => <AgentLayout children={page} />

export default View;
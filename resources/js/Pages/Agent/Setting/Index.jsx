import React, { useState } from 'react';
import AgentLayout from '@/Layouts/AgentLayout';
import { Head, usePage } from "@inertiajs/react";
import { Col, Row, Card, Tabs, Divider } from 'antd';
import { UserOutlined, LockOutlined, BankOutlined } from '@ant-design/icons';

import SettingProfile from './Profile';
import SettingPassword from './Password';
import SettingBank from './Bank';

const Index = () => {
    const { lang } = usePage().props;
    const initialTab = JSON.parse(localStorage.getItem('settingTab')) || "profile";
    const [defaultTab, setDefaultTab] = useState(initialTab);

    const onChange = (key) => {
        const updated = key;
        setDefaultTab(updated);
        localStorage.setItem('settingTab', JSON.stringify(updated))
    };

    const tabItems = [
        {
            key: 'profile',
            label: (
                <span>
                    <UserOutlined />
                    {lang.com.profile}
                </span>
            ),
            children: <SettingProfile />,
        },
        {
            key: 'password',
            label: (
                <span>
                    <LockOutlined />
                    {lang.com.change_password}
                </span>
            ),
            children: <SettingPassword />,
        },
        {
            key: 'bank',
            label: (
                <span>
                    <BankOutlined />
                    {lang.com.bank_information}
                </span>
            ),
            children: <SettingBank />,
        }
    ];

    return (
        <>
            <Head title={lang.com.settings} />
            <Card bordered={false} style={{ width: "100%", borderRadius: 0, paddingBottom: 20 }}>
                <Row justify={'space-between'} align={'middle'} style={{ marginBottom: 20, marginTop: 5 }}>
                    <Col>
                        <span className='page-title'>{lang.com.settings}</span>
                    </Col>
                </Row>
                <Divider />

                <Tabs
                    tabPosition={"left"}
                    defaultActiveKey={defaultTab}
                    items={tabItems}
                    onChange={onChange}
                />
            </Card >
        </>
    );
};

Index.layout = page => <AgentLayout children={page} />

export default Index;
import React, { useState } from 'react';
import AffiliateLayout from '@/Layouts/AffiliateLayout';
import { Head } from "@inertiajs/react";
import { Col, Row, Card, Tabs, Divider } from 'antd';
import { UserOutlined, LockOutlined, BankOutlined } from '@ant-design/icons';

import SettingProfile from './Profile';
import SettingPassword from './Password';
import SettingBank from './Bank';

const tabItems = [
    {
        key: 'profile',
        label: (
            <span>
                <UserOutlined />
                Profile
            </span>
        ),
        children: <SettingProfile />,
    },
    {
        key: 'password',
        label: (
            <span>
                <LockOutlined />
                Change Password
            </span>
        ),
        children: <SettingPassword />,
    },
    {
        key: 'bank',
        label: (
            <span>
                <BankOutlined />
                Bank Information
            </span>
        ),
        children: <SettingBank />,
    }
];

const Index = () => {

    const initialTab = JSON.parse(localStorage.getItem('settingTab')) || "profile";
    const [defaultTab, setDefaultTab] = useState(initialTab);

    const onChange = (key) => {
        const updated = key;
        setDefaultTab(updated);
        localStorage.setItem('settingTab', JSON.stringify(updated))
    };

    return (
        <>
            <Head title="Settings" />
            <Card bordered={false} style={{ width: "100%", borderRadius: 0, paddingBottom: 20 }}>
                <Row justify={'space-between'} align={'middle'} style={{ marginBottom: 20, marginTop: 5 }}>
                    <Col>
                        <span className='page-title'>Settings</span>
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

Index.layout = page => <AffiliateLayout children={page} />

export default Index;
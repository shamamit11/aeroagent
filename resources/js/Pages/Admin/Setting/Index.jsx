import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from "@inertiajs/react";
import { Col, Row, Card, Tabs, Divider } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import SettingProfile from './Profile';
import SettingPassword from './Password';

import "./style.scss";

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
    }
];

const Index = () => {

    const initialTab = JSON.parse(localStorage.getItem('adminSettingTab')) || "profile";
    const [defaultTab, setDefaultTab] = useState(initialTab);

    const onChange = (key) => {
        const updated = key;
        setDefaultTab(updated);
        localStorage.setItem('adminSettingTab', JSON.stringify(updated))
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

Index.layout = page => <AdminLayout children={page} />

export default Index;
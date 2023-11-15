import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    LogoutOutlined,
    CaretDownOutlined,
    LineChartOutlined,
    SettingOutlined
} from '@ant-design/icons';
import { Col, Layout, Menu, Row, Typography, Space, Dropdown, Avatar, Button } from 'antd';
import { Link, usePage } from '@inertiajs/react';

import "./style.scss";

import { affiliateNavItems } from './affiliateRoutes';

const { Header, Sider, Content, Footer } = Layout;

const items = [
    {
        key: 'settings',
        label: (
            <Link href='/settings'>
                Settings
            </Link>
        ),
        icon: <SettingOutlined />,
    },
    {
        type: 'divider',
    },
    {
        key: 'logout',
        label: (
            <Link href='/logout' method='post' as='div'>
                Logout
            </Link>
        ),
        icon: <LogoutOutlined />,
    },
];

const AffiliateLayout = ({ children }) => {

    const { auth } = usePage().props;
    const userRole = auth.user.role;

    const initial = JSON.parse(localStorage.getItem('sidebarCollapsed')) || false;
    const [collapsed, setCollapsed] = useState(initial);

    const toggleCollapse = () => {
        const updated = !collapsed;
        setCollapsed(updated)
        localStorage.setItem('sidebarCollapsed', JSON.stringify(updated))
    };

    return (
        <Layout className="app-layout">
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                style={{
                    overflow: 'auto',
                }}
            >

                <div className="demo-logo-vertical" />

                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[route().current()]}
                    items={affiliateNavItems}
                />

            </Sider>

            <Layout>
                <Header className='app-header'>
                    <Row justify='space-between'>
                        <Col>
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => toggleCollapse()}
                                style={{
                                    fontSize: '16px',
                                    width: 64,
                                    height: 64,
                                }}
                            />
                        </Col>
                        <Col>
                            <Dropdown menu={{ items }} trigger={['click']} placement="bottom" arrow>
                                <div>
                                    <a onClick={(e) => e.preventDefault()}>
                                        <Typography.Text className='auth-dropdown'>
                                            <Space size={12}>
                                                {!auth.user_image && (
                                                    <Avatar size={36} icon={<UserOutlined />} />
                                                )}
                                                {auth.user_image && (
                                                    <Avatar size={36} src={auth.user_image} />
                                                )}
                                                <div>
                                                    <div>
                                                        <Typography.Text strong>{auth.user.first_name} {auth.user.last_name}</Typography.Text>
                                                    </div>
                                                    <div>{auth.user.email}</div>
                                                </div>
                                                <CaretDownOutlined />
                                            </Space>
                                        </Typography.Text>
                                    </a>
                                </div>
                            </Dropdown>
                        </Col>

                    </Row>
                </Header>

                <Content className="main-content-layout">
                    {children}
                </Content>

                <Footer className="app-footer">
                    <div>AERO Real Estate CRM © 2023. Powered By: <a href="https://aera-capital.com" target="_blank" rel="noopener noreferrer">Aera Capital LLC</a></div>
                    <div>App Version: 1.0.0</div>
                </Footer>
            </Layout>
        </Layout>
    );
};
export default AffiliateLayout;
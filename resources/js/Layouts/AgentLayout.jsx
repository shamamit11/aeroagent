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
import AgentNavComponent from '@/components/AgentNavComponent';

import "./layout.scss";
import Logo from "/public/light-logo.png";

const { Header, Sider, Content, Footer } = Layout;

const AgentLayout = ({ children }) => {
    const { auth, lang } = usePage().props;
    const agentNavItems = AgentNavComponent();

    const initial = JSON.parse(localStorage.getItem('sidebarCollapsed')) || false;
    const [collapsed, setCollapsed] = useState(initial);

    const toggleCollapse = () => {
        const updated = !collapsed;
        setCollapsed(updated)
        localStorage.setItem('sidebarCollapsed', JSON.stringify(updated))
    };

    const items = [
        {
            key: 'settings',
            label: (
                <Link href='/settings'>
                    {lang.com.settings}
                </Link>
            ),
            icon: <SettingOutlined />,
        },
        {
            key: 'logs',
            label: (
                <Link href='/activity-log'>
                    {lang.com.acitvity_log}
                </Link>
            ),
            icon: <LineChartOutlined />,
        },
        {
            type: 'divider',
        },
        {
            key: 'logout',
            label: (
                <Link href='/logout' method='post' as='div'>
                    {lang.com.logout}
                </Link>
            ),
            icon: <LogoutOutlined />,
        },
    ];

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

                <div className="sidebar-logo">
                    <img src={Logo} />
                </div>

                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[route().current()]}
                    items={agentNavItems}
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
export default AgentLayout;
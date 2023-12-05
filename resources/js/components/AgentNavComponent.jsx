import {
    DashboardOutlined,
    GlobalOutlined,
    UserOutlined,
    PhoneOutlined,
    EyeOutlined,
    UsergroupAddOutlined,
    ShopOutlined,
    AppstoreOutlined,
    PullRequestOutlined,
    WalletOutlined,
    DeploymentUnitOutlined
} 
from '@ant-design/icons';
import { Link, usePage } from '@inertiajs/react';

const AgentNavComponent = () => {
    const { lang } = usePage().props;

    const getItem = (label, key, icon, children, type) => {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }

    const agentNavItems = [
        {
            key: 'dashboard',
            icon: <DashboardOutlined />,
            label: <Link href='/dashboard'>{lang.menuItems.dashboard}</Link>,
        },
    
        {
            key: 'wallet',
            icon: <WalletOutlined />,
            label: <Link href='/wallet-dashboard'>{lang.menuItems.wallet}</Link>,
        },
    
        {
            key: 'feed',
            icon: <DeploymentUnitOutlined />,
            label: <Link href='/feed/list'>{lang.menuItems.feed}</Link>,
        },
    
        getItem(lang.menuItems.data_management, 'customermanagement', null, [], 'group'),
    
        {
            key: 'customer',
            icon: <UserOutlined />,
            label: <Link href='/customer'>{lang.menuItems.list_customers}</Link>,
        },
    
        {
            key: 'seller',
            icon: <UserOutlined />,
            label: <Link href='/seller'>{lang.menuItems.sellers}</Link>,
        },
    
        {
            key: 'buyers',
            icon: <UserOutlined />,
            label: <Link href='/buyer'>{lang.menuItems.buyers}</Link>,
        },
    
        {
            key: 'leaser',
            icon: <UserOutlined />,
            label: <Link href='/leaser'>{lang.menuItems.leasers}</Link>,
        },
    
        {
            key: 'tenant',
            icon: <UserOutlined />,
            label: <Link href='/tenant'>{lang.menuItems.tenants}</Link>,
        },
    
        getItem(lang.menuItems.requests_management, 'requestmanagement', null, [], 'group'),
    
        {
            key: 'sellerrequest',
            icon: <PullRequestOutlined />,
            label: <Link href='/request-seller'>{lang.menuItems.seller_requests}</Link>,
        },
        
        {
            key: 'buyerrequest',
            icon: <PullRequestOutlined />,
            label: <Link href='/request-buyer'>{lang.menuItems.buyer_requests}</Link>,
        },
    
        {
            key: 'leaserrequest',
            icon: <PullRequestOutlined />,
            label: <Link href='/request-leaser'>{lang.menuItems.leaser_requests}</Link>,
        },
    
        {
            key: 'tenantrequest',
            icon: <PullRequestOutlined />,
            label: <Link href='/request-tenant'>{lang.menuItems.tenant_requests}</Link>,
        },
    
        getItem(lang.menuItems.customer_activities, 'customeractivity', null, [], 'group'),
    
        {
            key: 'followup',
            icon: <PhoneOutlined />,
            label: <Link href='/followup'>{lang.menuItems.follow_ups}</Link>,
        },
    
        {
            key: 'meeting',
            icon: <UsergroupAddOutlined />,
            label: <Link href='/meeting'>{lang.menuItems.meetings}</Link>,
        },
    
        {
            key: 'viewing',
            icon: <EyeOutlined />,
            label: <Link href='/viewing'>{lang.menuItems.viewings}</Link>,
        },
    
        getItem(lang.menuItems.project_management, 'projectmanagement', null, [], 'group'),
    
        {
            key: 'developer',
            icon: <ShopOutlined />,
            label: <Link href='/developer'>{lang.menuItems.developers}</Link>,
        },
    
        {
            key: 'project',
            icon: <AppstoreOutlined />,
            label: <Link href='/project'>{lang.menuItems.projects}</Link>,
        },
    
        getItem(lang.menuItems.other_configurations, 'systemconfig', null, [], 'group'),
        
        {
            key: 'location',
            icon: <GlobalOutlined />,
            label: <Link href='/location'>{lang.menuItems.locations}</Link>,
        }
    ];

    return agentNavItems;
}

export default AgentNavComponent;
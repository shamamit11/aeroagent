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
            label: <Link href='/dashboard'>{lang.com.dashboard}</Link>,
        },
    
        {
            key: 'wallet',
            icon: <WalletOutlined />,
            label: <Link href='/wallet-dashboard'>{lang.com.wallet}</Link>,
        },
    
        {
            key: 'feed',
            icon: <DeploymentUnitOutlined />,
            label: <Link href='/feed/list'>{lang.com.feed}</Link>,
        },
    
        getItem(lang.com.data_management, 'customermanagement', null, [], 'group'),
    
        {
            key: 'customer',
            icon: <UserOutlined />,
            label: <Link href='/customer'>{lang.com.list_customers}</Link>,
        },
    
        {
            key: 'seller',
            icon: <UserOutlined />,
            label: <Link href='/seller'>{lang.com.sellers}</Link>,
        },
    
        {
            key: 'buyers',
            icon: <UserOutlined />,
            label: <Link href='/buyer'>{lang.com.buyers}</Link>,
        },
    
        {
            key: 'leaser',
            icon: <UserOutlined />,
            label: <Link href='/leaser'>{lang.com.leasers}</Link>,
        },
    
        {
            key: 'tenant',
            icon: <UserOutlined />,
            label: <Link href='/tenant'>{lang.com.tenants}</Link>,
        },
    
        getItem(lang.com.requests_management, 'requestmanagement', null, [], 'group'),
    
        {
            key: 'sellerrequest',
            icon: <PullRequestOutlined />,
            label: <Link href='/request-seller'>{lang.com.seller_requests}</Link>,
        },
        
        {
            key: 'buyerrequest',
            icon: <PullRequestOutlined />,
            label: <Link href='/request-buyer'>{lang.com.buyer_requests}</Link>,
        },
    
        {
            key: 'leaserrequest',
            icon: <PullRequestOutlined />,
            label: <Link href='/request-leaser'>{lang.com.leaser_requests}</Link>,
        },
    
        {
            key: 'tenantrequest',
            icon: <PullRequestOutlined />,
            label: <Link href='/request-tenant'>{lang.com.tenant_requests}</Link>,
        },
    
        getItem(lang.com.customer_activities, 'customeractivity', null, [], 'group'),
    
        {
            key: 'followup',
            icon: <PhoneOutlined />,
            label: <Link href='/followup'>{lang.com.follow_ups}</Link>,
        },
    
        {
            key: 'meeting',
            icon: <UsergroupAddOutlined />,
            label: <Link href='/meeting'>{lang.com.meetings}</Link>,
        },
    
        {
            key: 'viewing',
            icon: <EyeOutlined />,
            label: <Link href='/viewing'>{lang.com.viewings}</Link>,
        },
    
        getItem(lang.com.project_management, 'projectmanagement', null, [], 'group'),
    
        {
            key: 'developer',
            icon: <ShopOutlined />,
            label: <Link href='/developer'>{lang.com.developers}</Link>,
        },
    
        {
            key: 'project',
            icon: <AppstoreOutlined />,
            label: <Link href='/project'>{lang.com.projects}</Link>,
        },
    
        getItem(lang.com.other_configurations, 'systemconfig', null, [], 'group'),
        
        {
            key: 'location',
            icon: <GlobalOutlined />,
            label: <Link href='/location'>{lang.com.locations}</Link>,
        }
    ];

    return agentNavItems;
}

export default AgentNavComponent;
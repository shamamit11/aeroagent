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
} from '@ant-design/icons';
import { Link } from '@inertiajs/react';

function getItem(label, key, icon, children, type) {
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
        label: <Link href='/dashboard'>Dashboard</Link>,
    },

    {
        key: 'wallet',
        icon: <WalletOutlined />,
        label: <Link href='/wallet-dashboard'>Wallet</Link>,
    },

    {
        key: 'feed',
        icon: <DeploymentUnitOutlined />,
        label: <Link href='/feed/list'>Feed</Link>,
    },

    getItem('Data Management', 'customermanagement', null, [], 'group'),

    {
        key: 'customer',
        icon: <UserOutlined />,
        label: <Link href='/customer'>List Customers</Link>,
    },

    {
        key: 'seller',
        icon: <UserOutlined />,
        label: <Link href='/seller'>Sellers</Link>,
    },

    {
        key: 'buyers',
        icon: <UserOutlined />,
        label: <Link href='/buyer'>Buyers</Link>,
    },

    {
        key: 'leaser',
        icon: <UserOutlined />,
        label: <Link href='/leaser'>Leasers</Link>,
    },

    {
        key: 'tenant',
        icon: <UserOutlined />,
        label: <Link href='/tenant'>Tenants</Link>,
    },

    getItem('Requests Management', 'requestmanagement', null, [], 'group'),

    {
        key: 'sellerrequest',
        icon: <PullRequestOutlined />,
        label: <Link href='/request-seller'>Seller Requests</Link>,
    },
    
    {
        key: 'buyerrequest',
        icon: <PullRequestOutlined />,
        label: <Link href='/request-buyer'>Buyer Requests</Link>,
    },

    {
        key: 'leaserrequest',
        icon: <PullRequestOutlined />,
        label: <Link href='/request-leaser'>Leaser Requests</Link>,
    },

    {
        key: 'tenantrequest',
        icon: <PullRequestOutlined />,
        label: <Link href='/request-tenant'>Tenant Requests</Link>,
    },

    getItem('Customer Activities', 'customeractivity', null, [], 'group'),

    {
        key: 'followup',
        icon: <PhoneOutlined />,
        label: <Link href='/followup'>Follow ups</Link>,
    },

    {
        key: 'meeting',
        icon: <UsergroupAddOutlined />,
        label: <Link href='/meeting'>Meetings</Link>,
    },

    {
        key: 'viewing',
        icon: <EyeOutlined />,
        label: <Link href='/viewing'>Viewings</Link>,
    },

    getItem('Project Management', 'projectmanagement', null, [], 'group'),

    {
        key: 'developer',
        icon: <ShopOutlined />,
        label: <Link href='/developer'>Developers</Link>,
    },

    {
        key: 'project',
        icon: <AppstoreOutlined />,
        label: <Link href='/project'>Projects</Link>,
    },

    getItem('Other Configurations', 'systemconfig', null, [], 'group'),
    
    {
        key: 'location',
        icon: <GlobalOutlined />,
        label: <Link href='/location'>Locations</Link>,
    }
]

export { agentNavItems };
import {
    DashboardOutlined,
    GlobalOutlined,
    UserOutlined,
    PhoneOutlined,
    EyeOutlined,
    UsergroupAddOutlined,
    ShopOutlined,
    AppstoreOutlined,
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
        label: <Link href='/'>Dashboard</Link>,
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
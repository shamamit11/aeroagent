import {
    DashboardOutlined,
    GlobalOutlined,
    UserOutlined,
    PhoneOutlined,
    EyeOutlined,
    UsergroupAddOutlined,
    ShopOutlined,
    AppstoreOutlined,
    BgColorsOutlined,
    ApartmentOutlined,
    GoldOutlined,
    HomeOutlined,
    SwitcherOutlined
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

const adminNavItems = [
    {
        key: 'dashboard',
        icon: <DashboardOutlined />,
        label: <Link href='/'>Dashboard</Link>,
    },

    // getItem('Client Management', 'clientmanagement', null, [], 'group'),

    // {
    //     key: 'client',
    //     icon: <UserOutlined />,
    //     label: <Link href={route('dashboard')}>Clients</Link>,
    // },

    // {
    //     key: 'followup',
    //     icon: <PhoneOutlined />,
    //     label: <Link href={route('dashboard')}>Follow ups</Link>,
    // },

    // {
    //     key: 'meeting',
    //     icon: <UsergroupAddOutlined />,
    //     label: <Link href={route('dashboard')}>Meetings</Link>,
    // },

    // {
    //     key: 'viewing',
    //     icon: <EyeOutlined />,
    //     label: <Link href={route('dashboard')}>Viewings</Link>,
    // },

    // getItem('Project Management', 'projectmanagement', null, [], 'group'),

    // {
    //     key: 'developer',
    //     icon: <ShopOutlined />,
    //     label: <Link href={route('dashboard')}>Developers</Link>,
    // },

    // {
    //     key: 'project',
    //     icon: <AppstoreOutlined />,
    //     label: <Link href={route('dashboard')}>Projects</Link>,
    // },

    getItem('System Configurations', 'systemconfig', null, [], 'group'),
    
    // {
    //     key: 'location',
    //     icon: <GlobalOutlined />,
    //     label: <Link href='/location'>Locations</Link>,
    // },

    {
        key: 'status',
        icon: <BgColorsOutlined />,
        label: <Link href='/status'>Statuses</Link>,
    },

    {
        key: 'amenity',
        icon: <ApartmentOutlined />,
        label: <Link href='/amenity'>Amenities</Link>,
    },

    {
        key: 'activityType',
        icon: <GoldOutlined />,
        label: <Link href='activityType'>Activity Types</Link>,
    },

    {
        key: 'property',
        icon: <HomeOutlined />,
        label: <Link href='/property'>Properties</Link>,
    },

    {
        key: 'propertyType',
        icon: <SwitcherOutlined />,
        label: <Link href='/propertyType'>Property Type</Link>,
    }
];

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

const affiliateNavItems = [
    {
        key: 'dashboard',
        icon: <DashboardOutlined />,
        label: <Link href='/'>Dashboard</Link>,
    }
];

export { adminNavItems, agentNavItems, affiliateNavItems };
import {
    DashboardOutlined,
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
        label: <Link href='/admin/dashboard'>Dashboard</Link>,
    },

    getItem('Users Management', 'usermanagement', null, [], 'group'),
    
    {
        key: 'user',
        icon: <BgColorsOutlined />,
        label: <Link href='/admin/user'>Users</Link>,
    },

    {
        key: 'payout',
        icon: <BgColorsOutlined />,
        label: <Link href='/admin/payout'>Payout</Link>,
    },

    getItem('System Configurations', 'systemconfig', null, [], 'group'),

    {
        key: 'status',
        icon: <BgColorsOutlined />,
        label: <Link href='/admin/status'>Statuses</Link>,
    },

    {
        key: 'amenity',
        icon: <ApartmentOutlined />,
        label: <Link href='/admin/amenity'>Amenities</Link>,
    },

    {
        key: 'activityType',
        icon: <GoldOutlined />,
        label: <Link href='/admin/activityType'>Activity Types</Link>,
    },

    {
        key: 'property',
        icon: <HomeOutlined />,
        label: <Link href='/admin/property'>Properties</Link>,
    },

    {
        key: 'propertyType',
        icon: <SwitcherOutlined />,
        label: <Link href='/admin/propertyType'>Property Type</Link>,
    }
];

export { adminNavItems };
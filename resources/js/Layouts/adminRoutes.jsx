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
        label: <Link href='/'>Dashboard</Link>,
    },

    getItem('System Configurations', 'systemconfig', null, [], 'group'),

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

export { adminNavItems };
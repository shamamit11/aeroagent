import {
    DashboardOutlined
} from '@ant-design/icons';
import { Link } from '@inertiajs/react';

const affiliateNavItems = [
    {
        key: 'dashboard',
        icon: <DashboardOutlined />,
        label: <Link href='/'>Dashboard</Link>,
    }
];

export { affiliateNavItems };
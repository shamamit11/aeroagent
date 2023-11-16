import {
    DashboardOutlined
} from '@ant-design/icons';
import { Link } from '@inertiajs/react';

const affiliateNavItems = [
    {
        key: 'wallet',
        icon: <DashboardOutlined />,
        label: <Link href='/wallet-dashboard'>Wallet</Link>,
    }
];

export { affiliateNavItems };
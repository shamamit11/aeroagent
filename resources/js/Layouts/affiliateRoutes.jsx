import {
    WalletOutlined
} from '@ant-design/icons';
import { Link } from '@inertiajs/react';

const affiliateNavItems = [
    {
        key: 'wallet',
        icon: <WalletOutlined />,
        label: <Link href='/wallet-dashboard'>Wallet</Link>,
    }
];

export { affiliateNavItems };
import {
    WalletOutlined
} 
from '@ant-design/icons';
import { Link, usePage } from '@inertiajs/react';

const AffiliateNavComponent = () => {
    const { lang } = usePage().props;

    const affiliateNavItems = [
        {
            key: 'wallet',
            icon: <WalletOutlined />,
            label: <Link href='/wallet-dashboard'>{lang.com.wallet}</Link>,
        }
    ];

    return affiliateNavItems;
}

export default AffiliateNavComponent;
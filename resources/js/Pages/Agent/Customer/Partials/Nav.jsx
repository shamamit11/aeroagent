import React, { useState } from 'react';
import { Menu } from 'antd';
import { Link } from '@inertiajs/react';
import "./style.scss";

const CustomerPageNav = () => {

    const customerPageSubMenu = JSON.parse(localStorage.getItem('defaultCustomerSubMenu')) || [route().current()];
    const [currentCustonerPageSubMenu, setCurrentCustomerPageSubMenu] = useState(customerPageSubMenu);

    const onCustomerSubMenuClick = (e) => {
        setCurrentCustomerPageSubMenu(e.key);
        localStorage.setItem('defaultCustomerSubMenu', JSON.stringify(e.key))
    };

    const navItems = [
        {
            key: 'customer',
            label: <Link href='/customer'>List All Customers</Link>
        },
        {
            key: 'seller',
            label: 'Add New Customer',
        },
        {
            key: 'buyer',
            label: 'Buyers',
        },
        {
            key: 'tenant',
            label: 'Tenants',
        },
        {
            key: 'leaser',
            label: 'Leasers',
        }
    ];

    return (
        <>
            <div className='customers'>
                <Menu onClick={onCustomerSubMenuClick} defaultSelectedKeys={[route().current()]} selectedKeys={[currentCustonerPageSubMenu]} mode="horizontal" items={navItems} />
            </div>
        </>
    )
}

export default CustomerPageNav;
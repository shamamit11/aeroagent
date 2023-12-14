import React from 'react';
import { usePage } from "@inertiajs/react";
import { Table } from 'antd';

import "./tabstyle.scss";

const TabDetail = () => {
    const props = usePage().props;
    const { lang } = usePage().props;
    const units = props.units;

    const columns = [
        {
            title: lang.com.property,
            key: 'property',
            width: 'auto',
            render: (_, record) => (
                <span>{record.property} / {record.property_type}</span>
            )
        },
        {
            title: lang.com.total_units,
            dataIndex: "total_units",
            key: 'total_units',
            width: '15%',
            align: "center"
        },
        {
            title: lang.com.size,
            key: 'sizes',
            width: '18%',
            align: "center",
            render: (_, record) => (
                <span>{record.size_from} - {record.size_to}</span>
            )
        },
        {
            title: lang.com.price_range,
            key: 'price_range',
            width: '18%',
            render: (_, record) => (
                <span>AED {record.price_from} - {record.price_to}</span>
            )
        }
    ];

    return (
        <>
            <div className='table-holder'>
                <Table columns={columns} dataSource={units} rowKey={(key) => key.id} pagination={{ defaultPageSize: 50 }} />
            </div>
        </>
    );
};

export default TabDetail;
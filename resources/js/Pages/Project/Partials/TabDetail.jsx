import React from 'react';
import { usePage } from "@inertiajs/react";
import { Table } from 'antd';

import "./style.scss";

const TabDetail = () => {
    const props = usePage().props;
    const units = props.units;

    const columns = [
        {
            title: 'Property',
            key: 'property',
            width: 'auto',
            render: (_, record) => (
                <span>{record.property} / {record.property_type}</span>
            )
        },
        {
            title: 'Total Units',
            dataIndex: "total_units",
            key: 'total_units',
            width: '15%',
            align: "center"
        },
        {
            title: 'Sizes (sq.ft)',
            key: 'sizes',
            width: '18%',
            align: "center",
            render: (_, record) => (
                <span>{record.size_from} - {record.size_to}</span>
            )
        },
        {
            title: 'Price Range',
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
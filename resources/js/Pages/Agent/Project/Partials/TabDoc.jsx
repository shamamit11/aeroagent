import React from 'react';
import { usePage } from "@inertiajs/react";
import { Table } from 'antd';

import "./tabstyle.scss";

const TabDetail = () => {
    const props = usePage().props;
    const { lang } = usePage().props;
    const docs = props.documents;

    const columns = [
        {
            title: lang.com.document_type,
            dataIndex: "doc_type",
            key: 'doc_type',
            width: '20%',
        },
        {
            title: lang.com.link,
            key: 'link',
            width: 'auto',
            render: (_, record) => (
                <a href={record.link} target='_blank'>{record.link}</a>
            )
        }
    ];

    return (
        <>
            <div className='table-holder'>
                <Table columns={columns} dataSource={docs} rowKey={(key) => key.id} pagination={{ defaultPageSize: 50 }} />
            </div>
        </>
    );
};

export default TabDetail;
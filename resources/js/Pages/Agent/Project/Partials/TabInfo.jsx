import React from 'react';
import { usePage } from "@inertiajs/react";
import { getObjectValue } from '@/utils';
import "./tabstyle.scss";

const TabInfo = () => {
    const props = usePage().props;
    const { lang } = usePage().props;
    const rowData = props.row;
    console.log(rowData);

    return (
        <>
            <div>
                <table className='table'>
                    <tbody>
                        <tr>
                            <th width="20%" align='left'>{lang.com.name} :</th>
                            <td width="80%" align='left'>{rowData.name}</td>
                        </tr>
                        <tr>
                            <th width="20%" align='left'>{lang.com.developer} :</th>
                            <td width="80%" align='left'>{rowData.developer.name}</td>
                        </tr>
                        <tr>
                            <th width="20%" align='left'>{lang.com.location} :</th>
                            <td width="80%" align='left'>{rowData.location.name}</td>
                        </tr>
                        <tr>
                            <th width="20%" align='left'>{lang.com.view_style} :</th>
                            <td width="80%" align='left'>{getObjectValue(lang, "com", rowData.view_style)}</td>
                        </tr>
                        <tr>
                            <th width="20%" align='left'>{lang.com.commission} :</th>
                            <td width="80%" align='left'>{rowData.commission} %</td>
                        </tr>
                        <tr>
                            <th width="20%" align='left'>{lang.com.handover_date} :</th>
                            <td width="80%" align='left'>{rowData.handover_date}</td>
                        </tr>
                        <tr>
                            <th width="20%" align='left'>{lang.com.project_status} :</th>
                            <td width="80%" align='left'>{getObjectValue(lang, "com", rowData.project_status)}</td>
                        </tr>
                        <tr>
                            <th width="20%" align='left'>{lang.com.amenities} :</th>
                            <td width="80%" align='left'>{rowData.amenities}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default TabInfo;
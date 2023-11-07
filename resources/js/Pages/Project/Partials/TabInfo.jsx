import React from 'react';
import { usePage } from "@inertiajs/react";
import "./style.scss";

const TabInfo = () => {
    const props = usePage().props;
    const rowData = props.row;

    return (
        <>
            <div>
                <table className='table'>
                    <tbody>
                        <tr>
                            <th width="20%" align='left'>Name</th>
                            <td width="80%" align='left'>{rowData.name}</td>
                        </tr>
                        <tr>
                            <th width="20%" align='left'>Developer</th>
                            <td width="80%" align='left'>{rowData.developer.name}</td>
                        </tr>
                        <tr>
                            <th width="20%" align='left'>Location</th>
                            <td width="80%" align='left'>{rowData.location.name}</td>
                        </tr>
                        <tr>
                            <th width="20%" align='left'>View Style</th>
                            <td width="80%" align='left'>{rowData.views}</td>
                        </tr>
                        <tr>
                            <th width="20%" align='left'>Commission</th>
                            <td width="80%" align='left'>{rowData.commission} %</td>
                        </tr>
                        <tr>
                            <th width="20%" align='left'>Handover Date</th>
                            <td width="80%" align='left'>{rowData.handover_date}</td>
                        </tr>
                        <tr>
                            <th width="20%" align='left'>Project Status</th>
                            <td width="80%" align='left'>{rowData.status}</td>
                        </tr>
                        <tr>
                            <th width="20%" align='left'>Amenities</th>
                            <td width="80%" align='left'>{rowData.amenities}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default TabInfo;
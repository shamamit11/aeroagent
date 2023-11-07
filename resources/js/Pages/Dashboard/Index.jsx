import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from "@inertiajs/react";
import { Card, Typography } from 'antd';

const Dashboard = (props) => {
    return (
        <>
            <Head title="Dashboard" />
            <Card title={`Welcome, ${props.auth.user.first_name}`}>
                <Typography.Text>You're logged in!</Typography.Text>
            </Card>
        </>
    );
};

Dashboard.layout = page => <AuthenticatedLayout children={page} />

export default Dashboard;
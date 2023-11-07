import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, useForm, router } from "@inertiajs/react";
import { Button, Form, Input, Row, Col, message, Space } from "antd";

import "./style.scss";

const AddEdit = () => {
    const props = usePage().props;
    const rowData = props.row;
    const [title, setTitle] = useState('');

    const { data, setData, post, processing, errors } = useForm({
        id: (rowData?.id) ? rowData?.id : 0,
        name: rowData?.name
    });

    useEffect(() => {
        setTitle(props.title);
    }, []);

    const submit = () => {
        post('/activityType/addAction', {
            onSuccess: () => {
                if (data.id == 0) {
                    message.success('Data Added Successfully !')
                } 
                else {
                    message.success('Data Updated Successfully !')
                }
            },
            onError: () => {
                message.error('There was an error processing your request. Please try again !')
            },
            onFinish: () => {
                router.get('/activityType')
            }
        });
    };

    const handleCancel = () => {
        router.get('/activityType')
    }

    return (
        <>
            <Head title={title} />
            <Row justify={'space-between'} align={'middle'}>
                <Col>
                    <h1 className='page-title'>{title}</h1>
                </Col>
            </Row>

            <div className="form-holder">
                <Form
                    name="basic"
                    layout='vertical'
                    initialValues={data}
                    onFieldsChange={(changedFields) => {
                        changedFields.forEach(item => {
                            setData(item.name[0], item.value);
                        })
                    }}
                    onFinish={submit}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Activity Type"
                        name="name"
                        validateStatus={errors.name && 'error'}
                        help={errors.name}
                        rules={[
                            {
                                required: true,
                                message: "This field is required",
                            }
                        ]}
                    >
                        <Input
                            disabled={processing}
                        />
                    </Form.Item>

                    <Form.Item className="form-actions">
                        <Space size="middle">
                            <Button type="primary" htmlType="submit" loading={processing} size="large">
                                {processing ? "Please Wait" : "Submit"}
                            </Button>

                            <Button danger size="large" onClick={handleCancel}>
                                Cancel
                            </Button>
                        </Space>
                    </Form.Item>

                </Form>
            </div>

        </>
    );
};

AddEdit.layout = page => <AuthenticatedLayout children={page} />

export default AddEdit;
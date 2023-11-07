import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, useForm, router } from "@inertiajs/react";
import { Button, Form, Input, Row, Col, message, Space, Select } from "antd";

import "./style.scss";

const AddEdit = () => {
    const props = usePage().props;
    const rowData = props.row;
    const properties = props.properties;
    const [title, setTitle] = useState('');

    const { data, setData, post, processing, errors } = useForm({
        id: (rowData?.id) ? rowData?.id : 0,
        name: rowData?.name,
        property_id: (rowData?.property_id) ? rowData?.property_id : 1
    });

    useEffect(() => {
        setTitle(props.title);
    }, []);

    const submit = () => {
        console.log(data);

        post('/propertyType/addAction', {
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
                router.get('/propertyType')
            }
        });
    };

    const handleCancel = () => {
        router.get('/propertyType')
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
                        label="Name"
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

                    <Form.Item
                        label="Property"
                        name="property_id"
                        validateStatus={errors.property_id && 'error'}
                        help={errors.property_id}
                        rules={[
                            {
                                required: true,
                                message: "This field is required",
                            }
                        ]}
                    >
                        <Select
                            options={properties.map((item) => ({
                                label: item.name,
                                value: item.id,
                            }))}
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
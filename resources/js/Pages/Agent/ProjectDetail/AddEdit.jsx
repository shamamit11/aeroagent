import React, { useEffect, useState } from 'react';
import AgentLayout from '@/Layouts/AgentLayout';
import { Head, usePage, useForm, router } from "@inertiajs/react";
import { Button, Form, Input, Select, Row, Col, message, Space, Card } from "antd";

const AddEdit = () => {
    const props = usePage().props;
    const rowData = props.row;
    const pid = props.pid;
    const properties = props.properties;
    const propertyTypes = props.propertyTypes;

    const [title, setTitle] = useState('');

    const [form] = Form.useForm();

    const [selectedProperty, setSelectedProperty] = useState(rowData?.property_id);
    const [selectedPropertyType, setSelectedPropertyType] = useState(rowData?.property_type_id);
    const [filteredPropertyTypes, setFilteredPropertyTypes] = useState([]);


    const { data, setData, post, processing, errors } = useForm({
        id: (rowData?.id) ? rowData?.id : 0,
        project_id: (rowData?.project_id) ? rowData?.project_id : pid,
        property_id: selectedProperty,
        property_type_id: selectedPropertyType,
        total_units: rowData?.total_units,
        size_from: rowData?.size_from,
        size_to: rowData?.size_to,
        price_from: rowData?.price_from,
        price_to: rowData?.price_to,
    });

    useEffect(() => {
        setTitle(props.title);
    }, []);

    useEffect(() => {
        const filteredPropertyTypes = propertyTypes.filter(c => c.property_id === selectedProperty);
        setFilteredPropertyTypes(filteredPropertyTypes);
    }, [selectedProperty]);

    const submit = () => {
        post('/project/detail/addAction', {
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
                router.get(`/project/detail?pid=${pid}`)
            }
        });
    };

    const handleCancel = () => {
        router.get(`/project/detail?pid=${pid}`)
    }

    return (
        <Card bordered={false} style={{ width: "100%", borderRadius: 0, paddingBottom: 20 }}>
            <Head title={title} />
            <Row justify={'space-between'} align={'middle'} style={{marginBottom: 20, marginTop: 5}}>
                <Col>
                    <span className='page-title'>{title}</span>
                </Col>
            </Row>

            <div className="form-holder">
                <Form
                    form={form}
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
                            placeholder="Select"
                            onChange={(val) => {
                                setSelectedProperty(val);
                                form.setFieldValue('property_type_id', undefined);
                            }}
                            options={properties.map((item) => ({
                                label: item.name,
                                value: item.id,
                            }))}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Property Type"
                        name="property_type_id"
                        validateStatus={errors.property_type_id && 'error'}
                        help={errors.property_type_id}
                        rules={[
                            {
                                required: true,
                                message: "This field is required",
                            }
                        ]}
                    >
                        <Select
                            placeholder="Select"
                            value={selectedPropertyType}
                            onChange={(val) => {
                                setSelectedPropertyType(val)
                            }}
                            options={filteredPropertyTypes.map((item) => ({
                                label: item.name,
                                value: item.id,
                            }))}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Total Units"
                        name="total_units"
                        validateStatus={errors.total_units && 'error'}
                        help={errors.total_units}
                        rules={[
                            {
                                required: true,
                                message: "This field is required",
                            }
                        ]}
                    >
                        <Input
                            type='number'
                            disabled={processing}
                        />
                    </Form.Item>

                    <Row justify={'space-between'} align={'middle'}>
                        <Col style={{ width: '48%' }}>
                            <Form.Item
                                label="Size From"
                                name="size_from"
                                validateStatus={errors.size_from && 'error'}
                                help={errors.size_from}
                                rules={[
                                    {
                                        required: true,
                                        message: "This field is required",
                                    }
                                ]}
                            >
                                <Input
                                    type='number'
                                    disabled={processing}
                                />
                            </Form.Item>
                        </Col>
                        <Col style={{ width: '48%' }}>
                            <Form.Item
                                label="Size To"
                                name="size_to"
                                validateStatus={errors.size_to && 'error'}
                                help={errors.size_to}
                                rules={[
                                    {
                                        required: true,
                                        message: "This field is required",
                                    }
                                ]}
                            >
                                <Input
                                    type='number'
                                    disabled={processing}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row justify={'space-between'} align={'middle'}>
                        <Col style={{ width: '48%' }}>
                            <Form.Item
                                label="Price From"
                                name="price_from"
                                validateStatus={errors.price_from && 'error'}
                                help={errors.price_from}
                                rules={[
                                    {
                                        required: true,
                                        message: "This field is required",
                                    }
                                ]}
                            >
                                <Input
                                    type='number'
                                    disabled={processing}
                                />
                            </Form.Item>
                        </Col>
                        <Col style={{ width: '48%' }}>
                            <Form.Item
                                label="Price To"
                                name="price_to"
                                validateStatus={errors.price_to && 'error'}
                                help={errors.price_to}
                                rules={[
                                    {
                                        required: true,
                                        message: "This field is required",
                                    }
                                ]}
                            >
                                <Input
                                    type='number'
                                    disabled={processing}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

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
        </Card>
    );
};

AddEdit.layout = page => <AgentLayout children={page} />

export default AddEdit;
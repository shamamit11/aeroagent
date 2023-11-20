import React, { useEffect, useState } from 'react';
import AgentLayout from '@/Layouts/AgentLayout';
import { Head, usePage, useForm, router } from "@inertiajs/react";
import { Button, Form, Input, Row, Col, message, Space, Card, Select } from "antd";

const { TextArea } = Input;

const AddEdit = () => {
    const props = usePage().props;
    const rowData = props.row;
    const [title, setTitle] = useState('');

    const properties = props.properties;
    const propertyTypes = props.propertyTypes;
    const customers = props.customers;
    const amenities = props.amenities;
    const status_name = (props.status) ? props.status : null;

    const [form] = Form.useForm();

    const [selectedProperty, setSelectedProperty] = useState(rowData?.property_id);
    const [selectedPropertyType, setSelectedPropertyType] = useState(rowData?.property_type_id);
    const [filteredPropertyTypes, setFilteredPropertyTypes] = useState([]);

    const amenities_id = rowData?.property_amenities;
    const amenitiesArray = amenities_id?.split(',').map(Number);

    const { data, setData, post, processing, errors } = useForm({
        id: (rowData?.id) ? rowData?.id : 0,
        customer_id: (rowData?.customer_id) ? rowData?.customer_id : props.customer_id,
        property_id: selectedProperty,
        property_type_id: selectedPropertyType,
        property_amenities: (rowData?.property_amenities) ? amenitiesArray : [],
        property_size: rowData?.property_size,
        budget: rowData?.budget,
        time_to_close: rowData?.time_to_close,
        note: (rowData?.note) ? rowData?.note : "",
        status: status_name,
        request_type: props.request_type,
        source_id: props.source_id,
    });

    useEffect(() => {
        setTitle(props.title);
    }, []);

    useEffect(() => {
        const filteredPropertyTypes = propertyTypes.filter(c => c.property_id === selectedProperty);
        setFilteredPropertyTypes(filteredPropertyTypes);
    }, [selectedProperty]);

    const submit = () => {
        post('/tenant/addAction', {
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
                router.get(`/tenant`)
            }
        });
    };

    const handleCancel = () => {
        router.get('/tenant')
    }

    return (
        <>
            <Card bordered={false} style={{ width: "100%", borderRadius: 0, paddingBottom: 20 }}>
                <Head title={title} />
                <Row justify={'space-between'} align={'middle'} style={{ marginBottom: 20, marginTop: 5 }}>
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
                        <Row justify={'space-between'} align={'middle'}>
                            <Col style={{ width: '100%' }}>
                                <Form.Item
                                    label="Customer"
                                    name="customer_id"
                                    validateStatus={errors.customer_id && 'error'}
                                    help={errors.customer_id}
                                    rules={[
                                        {
                                            required: true,
                                            message: "This field is required",
                                        }
                                    ]}
                                >
                                    <Select
                                        placeholder="Select"
                                        options={customers.map((item) => ({
                                            value: item.id,
                                            label: item.name
                                        }))}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row justify={'space-between'} align={'middle'}>
                            <Col style={{ width: '32%' }}>
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
                            </Col>
                            <Col style={{ width: '32%' }}>
                                <Form.Item
                                    label="Property Type"
                                    name="property_type_id"
                                    validateStatus={errors.property_type_id && 'error'}
                                    help={errors.property_type_id}
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
                            </Col>
                            <Col style={{ width: '32%' }}>
                                <Form.Item
                                    label="Property Size"
                                    name="property_size"
                                    validateStatus={errors.property_size && 'error'}
                                    help={errors.property_size}
                                >
                                    <Input
                                        type='number'
                                        onWheel={(e) => e.target.blur()}
                                        disabled={processing}
                                    />
                                </Form.Item>

                            </Col>
                        </Row>

                        <Form.Item
                            label="Amenities"
                            name="property_amenities"
                            validateStatus={errors.property_amenities && 'error'}
                            help={errors.property_amenities}
                        >
                            <Select
                                placeholder="Select"
                                mode="multiple"
                                allowClear
                                options={amenities.map((item) => ({
                                    label: item.name,
                                    value: item.id,
                                }))}
                            />
                        </Form.Item>

                        <Row justify={'space-between'} align={'middle'}>
                            <Col style={{ width: '49%' }}>
                                <Form.Item
                                    label="Budget"
                                    name="budget"
                                    validateStatus={errors.budget && 'error'}
                                    help={errors.budget}
                                >
                                    <Input
                                        type='number'
                                        onWheel={(e) => e.target.blur()}
                                        disabled={processing}
                                    />
                                </Form.Item>
                            </Col>

                            <Col style={{ width: '49%' }}>
                                <Form.Item
                                    label="Time to Close (Days)"
                                    name="time_to_close"
                                    validateStatus={errors.time_to_close && 'error'}
                                    help={errors.time_to_close}
                                >
                                    <Input
                                        type='number'
                                        onWheel={(e) => e.target.blur()}
                                        disabled={processing}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item
                            label="Note"
                            name="note"
                            validateStatus={errors.note && 'error'}
                            help={errors.note}
                        >
                            <TextArea rows={4} />
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
            </Card>
        </>
    );
};

AddEdit.layout = page => <AgentLayout children={page} />

export default AddEdit;
import React, { useEffect, useState } from 'react';
import AgentLayout from '@/Layouts/AgentLayout';
import { Head, usePage, useForm, router } from "@inertiajs/react";
import { Button, Form, Input, Row, Col, message, Space, Card, Select } from "antd";

import "./style.scss";

const { TextArea } = Input;

const AddEdit = () => {
    const props = usePage().props;

    const rowData = props.row;
    const [title, setTitle] = useState('');

    const [marketDisabled, setMarketDisabled] = useState(false);
    const [projectDisabled, setProjectDisabled] = useState(false);

    const properties = props.properties;
    const propertyTypes = props.propertyTypes;
    const customers = props.customers;
    const amenities = props.amenities;
    const projects = props.projects;
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
        interest: rowData?.interest,
        market: rowData?.market,
        project_id: (rowData?.project_id) ? rowData?.project_id : null,
        property_id: selectedProperty,
        property_type_id: selectedPropertyType,
        property_amenities: amenitiesArray,
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

        if (rowData?.property_id == 1 || rowData?.property_id == 2 || rowData?.property_id == 3 || rowData?.property_id == 4) {
            setMarketDisabled(false);
        } 
        else {
            setMarketDisabled(true);
        }

        if (rowData?.market == 'offplan') {
            setProjectDisabled(false);
        } 
        else {
            setProjectDisabled(true);
        }
    }, []);

    useEffect(() => {
        const filteredPropertyTypes = propertyTypes.filter(c => c.property_id === selectedProperty);
        setFilteredPropertyTypes(filteredPropertyTypes);
    }, [selectedProperty]);

    const submit = () => {
        post('/buyer/addAction', {
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
                router.get(`/buyer`)
            }
        });
    };

    const updateMarketSelect = (val) => {
        if (val == 1 || val == 2 || val == 3 || val == 4) {
            setMarketDisabled(false);
        }
        else {
            setMarketDisabled(true);
        }
    }

    const updateProjectSelect = (val) => {
        if (val == 'offplan') {
            setProjectDisabled(false);
        }
        else {
            setProjectDisabled(true);
        }
    }

    const handleCancel = () => {
        router.get('/buyer')
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
                                            updateMarketSelect(val);
                                            form.setFieldValue('property_type_id', undefined);
                                            form.setFieldValue('market', undefined);
                                            form.setFieldValue('project_id', undefined);
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
                                            form.setFieldValue('market', undefined);
                                            form.setFieldValue('project_id', undefined);
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
                                        disabled={processing}
                                    />
                                </Form.Item>

                            </Col>
                        </Row>

                        <Row justify={'space-between'} align={'middle'}>
                            <Col style={{ width: '32%' }}>
                                <Form.Item
                                    label="Market"
                                    name="market"
                                    validateStatus={errors.market && 'error'}
                                    help={errors.market}
                                >
                                    <Select
                                        disabled={marketDisabled}
                                        placeholder="Select"
                                        onChange={(val) => {
                                            updateProjectSelect(val);
                                            form.setFieldValue('project_id', undefined);
                                        }}
                                        options={[
                                            {
                                                value: 'n/a',
                                                label: 'N/A',
                                            },
                                            {
                                                value: 'offplan',
                                                label: 'Off-Plan',
                                            },
                                            {
                                                value: 'secondary',
                                                label: 'Secondary',
                                            }
                                        ]}
                                    />
                                </Form.Item>
                            </Col>
                            <Col style={{ width: '32%' }}>
                                <Form.Item
                                    label="Project"
                                    name="project_id"
                                    validateStatus={errors.project_id && 'error'}
                                    help={errors.project_id}
                                >
                                    <Select
                                        disabled={projectDisabled}
                                        placeholder="Select Project"
                                        options={projects.map((item) => ({
                                            label: item.name,
                                            value: item.id,
                                        }))}
                                    />
                                </Form.Item>
                            </Col>
                            <Col style={{ width: '32%' }}>
                                <Form.Item
                                    label="Interest"
                                    name="interest"
                                    validateStatus={errors.interest && 'error'}
                                    help={errors.interest}
                                    rules={[
                                        {
                                            required: true,
                                            message: "This field is required",
                                        }
                                    ]}
                                >
                                    <Select
                                        placeholder="Select"
                                        options={[
                                            {
                                                value: 'n/a',
                                                label: 'N/A',
                                            },
                                            {
                                                value: 'personal',
                                                label: 'Personal',
                                            },
                                            {
                                                value: 'investment',
                                                label: 'Investment',
                                            }
                                        ]}
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
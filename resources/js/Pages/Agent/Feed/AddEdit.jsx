import React, { useEffect, useState } from 'react';
import AgentLayout from '@/Layouts/AgentLayout';
import { Head, usePage, useForm, router } from "@inertiajs/react";
import { Button, Form, Input, Row, Col, message, Space, Card, Select } from "antd";

const { TextArea } = Input;

const AddEdit = () => {
    const props = usePage().props;

    const rowData = props.row;

    const [title, setTitle] = useState('');

    const [marketDisabled, setMarketDisabled] = useState(false);
    const [projectDisabled, setProjectDisabled] = useState(false);

    const properties = props.properties;
    const propertyTypes = props.propertyTypes;
    const locations = props.locations;
    const projects = props.projects;

    const [form] = Form.useForm();

    const [selectedProperty, setSelectedProperty] = useState(rowData?.property_id);
    const [selectedPropertyType, setSelectedPropertyType] = useState(rowData?.property_type_id);
    const [filteredPropertyTypes, setFilteredPropertyTypes] = useState([]);

    const location_id = rowData?.location;
    const locationArray = location_id?.split(',').map(Number);

    const { data, setData, post, processing, errors } = useForm({
        id: (rowData?.id) ? rowData?.id : 0,
        looking_for: rowData?.looking_for,
        market: rowData?.market,
        project_id: (rowData?.project_id) ? rowData?.project_id : null,
        property_id: selectedProperty,
        property_type_id: selectedPropertyType,
        location: (rowData?.location) ? locationArray : [],
        property_size: rowData?.property_size,
        budget: rowData?.budget,
        time_to_close: rowData?.time_to_close,
        note: (rowData?.note) ? rowData?.note : "",
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
        post('/feed/addAction', {
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
                router.get(`/feed`)
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
        router.get('/feed')
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

                            <Col style={{ width: '32%' }}>
                                <Form.Item
                                    label="Looking For"
                                    name="looking_for"
                                    validateStatus={errors.looking_for && 'error'}
                                    help={errors.looking_for}
                                >
                                    <Select
                                        placeholder="Select"
                                        options={[
                                            {
                                                value: 'seller',
                                                label: 'Seller',
                                            },
                                            {
                                                value: 'buyer',
                                                label: 'Buyer',
                                            },
                                            {
                                                value: 'leaser',
                                                label: 'Leaser',
                                            },
                                            {
                                                value: 'tenant',
                                                label: 'Tenant',
                                            }
                                        ]}
                                    />
                                </Form.Item>
                            </Col>

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
                            label="Locations"
                            name="location"
                            validateStatus={errors.location && 'error'}
                            help={errors.location}
                        >
                            <Select
                                placeholder="Select"
                                mode="multiple"
                                allowClear
                                options={locations.map((item) => ({
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
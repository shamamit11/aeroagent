import React, { useEffect, useState } from 'react';
import AgentLayout from '@/Layouts/AgentLayout';
import { Head, usePage, useForm, router } from "@inertiajs/react";
import { Button, Form, Input, Row, Col, message, Space, Card, Select } from "antd";

const { TextArea } = Input;

const AddEdit = () => {
    const props = usePage().props;
    const {locale, lang} = usePage().props;
    const rowData = props.row;

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
                    message.success(lang.com.data_added)
                }
                else {
                    message.success(lang.com.data_updated)
                }
            },
            onError: () => {
                message.error(lang.com.error_request)
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
                <Head title={rowData?.id ? lang.com.edit_feed : lang.com.add_feed} />
                <Row justify={'space-between'} align={'middle'} style={{ marginBottom: 20, marginTop: 5 }}>
                    <Col>
                        <span className='page-title'>{rowData?.id ? lang.com.edit_feed : lang.com.add_feed}</span>
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
                                    label={lang.com.looking_for}
                                    name="looking_for"
                                    validateStatus={errors.looking_for && 'error'}
                                    help={errors.looking_for}
                                >
                                    <Select
                                        placeholder={lang.com.select}
                                        options={[
                                            {
                                                value: 'seller',
                                                label: lang.com.seller,
                                            },
                                            {
                                                value: 'buyer',
                                                label: lang.com.buyer,
                                            },
                                            {
                                                value: 'leaser',
                                                label: lang.com.leaser,
                                            },
                                            {
                                                value: 'tenant',
                                                label: lang.com.tenant,
                                            }
                                        ]}
                                    />
                                </Form.Item>
                            </Col>

                            <Col style={{ width: '32%' }}>
                                <Form.Item
                                    label={lang.com.property}
                                    name="property_id"
                                    validateStatus={errors.property_id && 'error'}
                                    help={errors.property_id}
                                    rules={[
                                        {
                                            required: true,
                                            message: lang.com.field_required,
                                        }
                                    ]}
                                >
                                    <Select
                                        placeholder={lang.com.select}
                                        onChange={(val) => {
                                            setSelectedProperty(val);
                                            updateMarketSelect(val);
                                            form.setFieldValue('property_type_id', undefined);
                                            form.setFieldValue('market', undefined);
                                            form.setFieldValue('project_id', undefined);
                                        }}
                                        options={properties.map((item) => ({
                                            label: (locale == 'ar' ? item.ar_name : item.name),
                                            value: item.id,
                                        }))}
                                    />
                                </Form.Item>
                            </Col>
                            <Col style={{ width: '32%' }}>
                                <Form.Item
                                    label={lang.com.property_type}
                                    name="property_type_id"
                                    validateStatus={errors.property_type_id && 'error'}
                                    help={errors.property_type_id}
                                >
                                    <Select
                                        placeholder={lang.com.select}
                                        value={selectedPropertyType}
                                        onChange={(val) => {
                                            setSelectedPropertyType(val)
                                            form.setFieldValue('market', undefined);
                                            form.setFieldValue('project_id', undefined);
                                        }}
                                        options={filteredPropertyTypes.map((item) => ({
                                            label: (locale == 'ar' ? item.ar_name : item.name),
                                            value: item.id,
                                        }))}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row justify={'space-between'} align={'middle'}>
                            <Col style={{ width: '32%' }}>
                                <Form.Item
                                    label={lang.com.market}
                                    name="market"
                                    validateStatus={errors.market && 'error'}
                                    help={errors.market}
                                >
                                    <Select
                                        disabled={marketDisabled}
                                        placeholder={lang.com.select}
                                        onChange={(val) => {
                                            updateProjectSelect(val);
                                            form.setFieldValue('project_id', undefined);
                                        }}
                                        options={[
                                            {
                                                value: 'n/a',
                                                label: lang.com.na,
                                            },
                                            {
                                                value: 'offplan',
                                                label: lang.com.offplan,
                                            },
                                            {
                                                value: 'secondary',
                                                label: lang.com.secondary,
                                            }
                                        ]}
                                    />
                                </Form.Item>
                            </Col>
                            <Col style={{ width: '32%' }}>
                                <Form.Item
                                    label={lang.com.project}
                                    name="project_id"
                                    validateStatus={errors.project_id && 'error'}
                                    help={errors.project_id}
                                >
                                    <Select
                                        disabled={projectDisabled}
                                        placeholder={lang.com.select}
                                        options={projects.map((item) => ({
                                            label: item.name,
                                            value: item.id,
                                        }))}
                                    />
                                </Form.Item>
                            </Col>
                            <Col style={{ width: '32%' }}>
                                <Form.Item
                                    label={lang.com.property_size}
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
                            label={lang.com.locations}
                            name="location"
                            validateStatus={errors.location && 'error'}
                            help={errors.location}
                        >
                            <Select
                                placeholder={lang.com.select}
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
                                    label={lang.com.budget}
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
                                    label={lang.com.time_to_close + " (" + lang.com.days + ")"}
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
                            label={lang.com.note}
                            name="note"
                            validateStatus={errors.note && 'error'}
                            help={errors.note}
                        >
                            <TextArea rows={4} />
                        </Form.Item>

                        <Form.Item className="form-actions">
                            <Space size="middle">
                                <Button type="primary" htmlType="submit" loading={processing} size="large">
                                    {processing ? lang.com.please_wait : lang.com.submit}
                                </Button>

                                <Button danger size="large" onClick={handleCancel}>
                                    {lang.com.cancel}
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
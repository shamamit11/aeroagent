import React, { useEffect, useState } from 'react';
import AgentLayout from '@/Layouts/AgentLayout';
import { Head, usePage, useForm, router } from "@inertiajs/react";
import { Button, Form, Input, Row, Col, message, Space, Select, DatePicker, Card } from "antd";
import dayjs from 'dayjs';

import "./style.scss";

const AddEdit = () => {
    const props = usePage().props;
    const rowData = props.row;
    const developers = props.developers;
    const locations = props.locations;
    const amenities = props.amenities;
    const [title, setTitle] = useState('');

    const dateFormat = "YYYY-MM-DD";

    const amenities_id = rowData?.amenities_id;
    const amenitiesArray = amenities_id?.split(',').map(Number);

    const { data, setData, post, processing, errors } = useForm({
        id: (rowData?.id) ? rowData?.id : 0,
        name: rowData?.name,
        developer_id: rowData?.developer_id,
        location_id: rowData?.location_id,
        handover_date: rowData?.handover_date ? dayjs(rowData?.handover_date, dateFormat) : dayjs(),
        commission: rowData?.commission,
        view_style: rowData?.view_style,
        amenities_id: amenitiesArray,
        project_status: rowData?.project_status,
    });

    useEffect(() => {
        setTitle(props.title);
    }, []);

    const submit = () => {
        post('/project/addAction', {
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
                router.get('/project')
            }
        });
    };

    const handleCancel = () => {
        router.get('/project')
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

                    <Row justify={'space-between'} align={'middle'}>
                        <Col style={{ width: '48%' }}>
                            <Form.Item
                                label="Developer"
                                name="developer_id"
                                validateStatus={errors.developer_id && 'error'}
                                help={errors.developer_id}
                                rules={[
                                    {
                                        required: true,
                                        message: "This field is required",
                                    }
                                ]}
                            >
                                <Select
                                    placeholder="Select"
                                    options={developers.map((item) => ({
                                        label: item.name,
                                        value: item.id,
                                    }))}
                                />
                            </Form.Item>
                        </Col>
                        <Col style={{ width: '48%' }}>
                            <Form.Item
                                label="Location"
                                name="location_id"
                                validateStatus={errors.location_id && 'error'}
                                help={errors.location_id}
                                rules={[
                                    {
                                        required: true,
                                        message: "This field is required",
                                    }
                                ]}
                            >
                                <Select
                                    placeholder="Select"
                                    options={locations.map((item) => ({
                                        label: item.name,
                                        value: item.id,
                                    }))}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row justify={'space-between'} align={'middle'}>
                        <Col style={{ width: '48%' }}>
                            <Form.Item
                                label="Handover Date"
                                name="handover_date"
                                validateStatus={errors.handover_date && 'error'}
                                help={errors.handover_date}
                                rules={[
                                    {
                                        required: true,
                                        message: "This field is required",
                                    }
                                ]}
                            >
                                <DatePicker format={dateFormat} />
                            </Form.Item>
                        </Col>
                        <Col style={{ width: '48%' }}>
                            <Form.Item
                                label="Commission (%)"
                                name="commission"
                                validateStatus={errors.commission && 'error'}
                                help={errors.commission}
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
                        </Col>
                    </Row>

                    <Row justify={'space-between'} align={'middle'}>
                        <Col style={{ width: '48%' }}>
                            <Form.Item
                                label="View Style"
                                name="view_style"
                                validateStatus={errors.view_style && 'error'}
                                help={errors.view_style}
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
                                            value: 'normal_view',
                                            label: 'Normal View',
                                        },
                                        {
                                            value: 'sea_view',
                                            label: 'Sea View',
                                        },
                                        {
                                            value: 'mountain_view',
                                            label: 'Mountain View',
                                        },
                                        {
                                            value: 'open_view',
                                            label: 'Open View',
                                        },
                                        {
                                            value: 'street_view',
                                            label: 'Street View',
                                        },
                                        {
                                            value: 'pool_view',
                                            label: 'Pool View',
                                        }
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        <Col style={{ width: '48%' }}>
                            <Form.Item
                                label="Project Status"
                                name="project_status"
                                validateStatus={errors.project_status && 'error'}
                                help={errors.project_status}
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
                                            value: 'completed',
                                            label: 'Completed',
                                        },
                                        {
                                            value: 'under_construction',
                                            label: 'Under Construction',
                                        }
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        label="Amenities"
                        name="amenities_id"
                        validateStatus={errors.amenities_id && 'error'}
                        help={errors.amenities_id}
                        rules={[
                            {
                                required: true,
                                message: "This field is required",
                            }
                        ]}
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
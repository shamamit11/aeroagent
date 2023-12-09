import React, { useEffect, useState } from 'react';
import AgentLayout from '@/Layouts/AgentLayout';
import { Head, usePage, useForm, router } from "@inertiajs/react";
import { Button, Form, Input, Row, Col, message, Space, Select, DatePicker, Card } from "antd";
import dayjs from 'dayjs';

const AddEdit = () => {
    const props = usePage().props;
    const { locale, lang } = usePage().props;
    const rowData = props.row;
    const developers = props.developers;
    const locations = props.locations;
    const amenities = props.amenities;

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

    const submit = () => {
        post('/project/addAction', {
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
                router.get('/project')
            }
        });
    };

    const handleCancel = () => {
        router.get('/project')
    }

    return (
        <Card bordered={false} style={{ width: "100%", borderRadius: 0, paddingBottom: 20 }}>
            <Head title={rowData?.id ? lang.com.edit_project : lang.com.add_project} />
            <Row justify={'space-between'} align={'middle'} style={{ marginBottom: 20, marginTop: 5 }}>
                <Col>
                    <span className='page-title'>{rowData?.id ? lang.com.edit_project : lang.com.add_project}</span>
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
                        label={lang.com.name}
                        name="name"
                        validateStatus={errors.name && 'error'}
                        help={errors.name}
                        rules={[
                            {
                                required: true,
                                message: lang.com.field_required,
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
                                label={lang.com.developer}
                                name="developer_id"
                                validateStatus={errors.developer_id && 'error'}
                                help={errors.developer_id}
                                rules={[
                                    {
                                        required: true,
                                        message: lang.com.field_required,
                                    }
                                ]}
                            >
                                <Select
                                    placeholder={lang.com.select}
                                    options={developers.map((item) => ({
                                        label: item.name,
                                        value: item.id,
                                    }))}
                                />
                            </Form.Item>
                        </Col>
                        <Col style={{ width: '48%' }}>
                            <Form.Item
                                label={lang.com.location}
                                name="location_id"
                                validateStatus={errors.location_id && 'error'}
                                help={errors.location_id}
                                rules={[
                                    {
                                        required: true,
                                        message: lang.com.field_required,
                                    }
                                ]}
                            >
                                <Select
                                    placeholder={lang.com.select}
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
                                label={lang.com.handover_date}
                                name="handover_date"
                                validateStatus={errors.handover_date && 'error'}
                                help={errors.handover_date}
                                rules={[
                                    {
                                        required: true,
                                        message: lang.com.field_required,
                                    }
                                ]}
                            >
                                <DatePicker format={dateFormat} />
                            </Form.Item>
                        </Col>
                        <Col style={{ width: '48%' }}>
                            <Form.Item
                                label={lang.com.commission + " (%)"}
                                name="commission"
                                validateStatus={errors.commission && 'error'}
                                help={errors.commission}
                                rules={[
                                    {
                                        required: true,
                                        message: lang.com.field_required,
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
                                label={lang.com.view_style}
                                name="view_style"
                                validateStatus={errors.view_style && 'error'}
                                help={errors.view_style}
                                rules={[
                                    {
                                        required: true,
                                        message: lang.com.field_required,
                                    }
                                ]}
                            >
                                <Select
                                    placeholder={lang.com.select}
                                    options={[
                                        {
                                            value: 'normal_view',
                                            label: lang.com.normal_view
                                        },
                                        {
                                            value: 'sea_view',
                                            label: lang.com.sea_view
                                        },
                                        {
                                            value: 'mountain_view',
                                            label: lang.com.mountain_view
                                        },
                                        {
                                            value: 'open_view',
                                            label: lang.com.open_view
                                        },
                                        {
                                            value: 'street_view',
                                            label: lang.com.street_view
                                        },
                                        {
                                            value: 'pool_view',
                                            label: lang.com.pool_view
                                        }
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        <Col style={{ width: '48%' }}>
                            <Form.Item
                                label={lang.com.project_status}
                                name="project_status"
                                validateStatus={errors.project_status && 'error'}
                                help={errors.project_status}
                                rules={[
                                    {
                                        required: true,
                                        message: lang.com.field_required,
                                    }
                                ]}
                            >
                                <Select
                                    placeholder={lang.com.select}
                                    options={[
                                        {
                                            value: 'completed',
                                            label: lang.com.completed
                                        },
                                        {
                                            value: 'under_construction',
                                            label: lang.com.under_construction
                                        }
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        label={lang.com.amenities}
                        name="amenities_id"
                        validateStatus={errors.amenities_id && 'error'}
                        help={errors.amenities_id}
                        rules={[
                            {
                                required: true,
                                message: lang.com.field_required,
                            }
                        ]}
                    >
                        <Select
                            placeholder={lang.com.select}
                            mode="multiple"
                            allowClear
                            options={amenities.map((item) => ({
                                label: locale == 'ar' ? item.ar_name : item.name,
                                value: item.id,
                            }))}
                        />
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
    );
};

AddEdit.layout = page => <AgentLayout children={page} />

export default AddEdit;
import React from 'react';
import { usePage, useForm, router } from "@inertiajs/react";
import { Button, Input, Space, Form, message } from 'antd';

const SettingBank = () => {
    const props = usePage().props;
    const rowData = props.bank;

    const { data, setData, post, processing, errors } = useForm({
        bank_name: rowData?.bank_name,
        account_name: rowData?.account_name,
        account_no: rowData?.account_no,
        iban: rowData?.iban,
    });

    const submit = () => {
        post('/settings/updateBank', {
            forceFormData: true,
            onSuccess: () => {
                message.success('Bank Updated Successfully !')
            },
            onError: () => {
                message.error('There was an error processing your request. Please try again !')
            },
            onFinish: () => {
                router.get('/settings')
            }
        });
    };

    return (
        <>
            <div className="form-holder">
                <Form
                    name="bankbasic"
                    layout='vertical'
                    initialValues={data}
                    onFieldsChange={(changedFields) => {
                        changedFields.forEach(item => {
                            setData(item.name[0], item.value);
                        })
                    }}
                    onFinish={submit}
                    autoComplete="off"
                    encType="multipart/form-data"
                >
                    <Form.Item
                        label="Bank Name"
                        name="bank_name"
                        validateStatus={errors.bank_name && 'error'}
                        help={errors.bank_name}
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
                        label="Account Name"
                        name="account_name"
                        validateStatus={errors.account_name && 'error'}
                        help={errors.account_name}
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
                        label="Account Number"
                        name="account_no"
                        validateStatus={errors.account_no && 'error'}
                        help={errors.account_no}
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
                        label="IBAN"
                        name="iban"
                        validateStatus={errors.iban && 'error'}
                        help={errors.iban}
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
                                {processing ? "Please Wait" : "Update"}
                            </Button>
                        </Space>
                    </Form.Item>

                </Form>
            </div>
        </>
    );
};

export default SettingBank;
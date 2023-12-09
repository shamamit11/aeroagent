import React from 'react';
import { useForm, router, usePage } from "@inertiajs/react";
import { Button, Input, Space, Form, message } from 'antd';

const SettingPassword = () => {
    const { lang } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        old_password: '',
        new_password: '',
        confirm_password: ''
    });

    const submit = () => {
        post('/settings/updatePassword', {
            forceFormData: true,
            onSuccess: (e) => {
                console.log(e.props.error);
                if (e.props.error) {
                    message.error(e.props.error)
                }
                else {
                    message.success(lang.com.data_updated)
                }
            },
            onError: (errors) => {
                Object.entries(errors).map(([key, value]) => (
                    message.error(value)
                ));
            },
            onFinish: () => {
                router.get('/dashboard')
                router.post('/logout')
            }
        });
    };

    return (
        <>
            <div className="form-holder">
                <Form
                    name="passbasic"
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
                        label={lang.com.current_password}
                        name="old_password"
                        validateStatus={errors.old_password && 'error'}
                        help={errors.old_password}
                        rules={[
                            {
                                required: true,
                                message: lang.com.field_required,
                            }
                        ]}
                    >
                        <Input.Password
                            disabled={processing}
                            autoComplete="current-password"
                        />
                    </Form.Item>

                    <Form.Item
                        label={lang.com.new_password}
                        name="new_password"
                        validateStatus={errors.new_password && 'error'}
                        help={errors.new_password}
                        rules={[
                            {
                                required: true,
                                message: lang.com.field_required,
                            }
                        ]}
                    >
                        <Input.Password
                            disabled={processing}
                            autoComplete="current-password"
                        />
                    </Form.Item>

                    <Form.Item
                        label={lang.com.confirm_password}
                        name="confirm_password"
                        validateStatus={errors.confirm_password && 'error'}
                        help={errors.confirm_password}
                        rules={[
                            {
                                required: true,
                                message: lang.com.field_required,
                            }
                        ]}
                    >
                        <Input.Password
                            disabled={processing}
                            autoComplete="current-password"
                        />
                    </Form.Item>

                    <Form.Item className="form-actions">
                        <Space size="middle">
                            <Button type="primary" htmlType="submit" loading={processing} size="large">
                                {processing ? lang.com.please_wait : lang.com.update}
                            </Button>
                        </Space>
                    </Form.Item>

                </Form>
            </div>
        </>
    );
};

export default SettingPassword;
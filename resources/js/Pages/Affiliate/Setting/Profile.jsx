import React, { useEffect, useState } from 'react';
import { usePage, useForm, router } from "@inertiajs/react";
import { Button, Input, Space, Divider, Form, Avatar, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const SettingProfile = () => {
    const props = usePage().props;
    const rowData = props.profile;

    const [profileImage, setProfileImage] = useState('');

    const { data, setData, post, processing, errors } = useForm({
        first_name: rowData?.first_name,
        last_name: rowData?.last_name,
        upload_image: ''
    });

    useEffect(() => {
    }, []);

    const updateImage = (img) => {
        const imgUrl = URL.createObjectURL(img)
        setProfileImage(imgUrl);
        setData('upload_image', img);
    }

    const submit = () => {
        post('/settings/updateProfile', {
            forceFormData: true,
            onSuccess: () => {
                message.success('Profile Updated Successfully !')
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
                    encType="multipart/form-data"
                >
                    <Form.Item
                        label="First Name"
                        name="first_name"
                        validateStatus={errors.first_name && 'error'}
                        help={errors.first_name}
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
                        label="Last Name"
                        name="last_name"
                        validateStatus={errors.last_name && 'error'}
                        help={errors.last_name}
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
                        label="Select Profile Image | Dimension: (150px X 150px) | Max Size: 200Kb"
                        name="upload_image"
                        validateStatus={errors.upload_image && 'error'}
                        help={errors.upload_image}
                    >
                        <Input type='file' accept='.png,.jpg,.jpeg' onChange={e => updateImage(e.target.files[0])} />
                    </Form.Item>

                    {!rowData.image && !profileImage && (
                        <Space wrap size={16}>
                            <Avatar shape="square" size={80} icon={<UserOutlined />} />
                        </Space>
                    )}

                    {rowData.image && !profileImage && (
                        <Space wrap size={16}>
                            <Avatar shape="square" size={80} src={rowData?.image_path} />
                        </Space>
                    )}

                    {profileImage && (
                        <Space wrap size={16}>
                            <Avatar shape="square" size={80} src={profileImage} />
                        </Space>
                    )}

                    <Divider />

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

export default SettingProfile;
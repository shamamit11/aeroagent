import React from 'react';
import { Head, router, usePage } from "@inertiajs/react";
import { Button, message, Card} from "antd";

import Logo from "../../../../public/light-logo.png";

const PaymentConfirmation = () => {
    const { lang } = usePage().props;

    const handleClick = () => {
        message.success(lang.com.account_created);
        router.get(`/login`)
    };

    return (
        <div className="login-page" id="loginPage">
            <Head title={lang.com.payment_confirmation} />

            <div className="login-form">
                <div className="login-form-header">
                    <img src={Logo} />
                </div>
                <Card style={{ width: 500}}>
                    <div className='login-text-holder'>
                        <h1>{lang.com.payment_confirmation}</h1>
                        <p>{lang.com.payment_success_text}</p>
                    </div>
                    <Button type='primary' size='large' block onClick={handleClick}>{lang.com.proceed_with_account_creation}</Button>
                </Card>
                
            </div>
        </div>
    );
};

export default PaymentConfirmation;
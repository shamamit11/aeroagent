import React from 'react';
import { Head, router } from "@inertiajs/react";
import { Button, message, Card} from "antd";

import Logo from "../../../../public/favicon.svg";

import "./style.scss";

const PaymentConfirmation = () => {

    const userData = JSON.parse(localStorage.getItem('newUser'));
   
    const handleClick = () => {
        router.post('/register', userData, {
            onSuccess: () => {
                message.success('Your Account has been created successfully !');
                localStorage.removeItem('newUser');
            },
            onFinish: () => {
                router.get(`/login`)
            }
        });
    };

    return (
        <div className="login-page" id="loginPage">
            <Head title="Payment Confirmation" />

            <div className="login-form">
                <div className="login-form-header">
                    <img src={Logo} />
                </div>
                <Card style={{ width: 500}}>
                    <div className='login-text-holder'>
                        <h1>Payment Confirmation</h1>
                        <p>Your payment is successful. Please click the button below to proceed further with Account Creation.</p>
                    </div>
                    <Button type='primary' size='large' block onClick={handleClick}>Proceed with Account Creation</Button>
                </Card>
                
            </div>
        </div>
    );
};

export default PaymentConfirmation;
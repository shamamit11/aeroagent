import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { useForm, Head, Link } from "@inertiajs/react";
import { Form, Select, Input, Radio, Button, Divider, Modal } from "antd";
import { UserOutlined, PhoneOutlined, MailOutlined, LockOutlined, CodeOutlined } from "@ant-design/icons";
import { L as Logo } from "./light-logo-3220573e.js";
/* empty css                */const Register = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, setData, post, processing, errors, reset } = useForm({
    profession: void 0,
    first_name: "",
    last_name: "",
    mobile: "",
    email: "",
    password: "",
    password_confirmation: "",
    referral_code: "",
    terms: ""
  });
  const [form] = Form.useForm();
  const passwordRules = [
    {
      required: true,
      message: "Please input your password!"
    },
    {
      max: 50,
      message: "Password should not exceed 50 characters"
    }
  ];
  const submit = () => {
    post("/register/stripeSession", {
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      onSuccess: (page) => {
        localStorage.setItem("newUser", JSON.stringify(data));
        location.href = page.props.stripe_url;
      }
    });
  };
  const handleModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "login-page", id: "loginPage", children: [
      /* @__PURE__ */ jsx(Head, { title: "Register" }),
      /* @__PURE__ */ jsxs("div", { className: "login-form", children: [
        /* @__PURE__ */ jsx("div", { className: "login-form-header", children: /* @__PURE__ */ jsx("img", { src: Logo }) }),
        /* @__PURE__ */ jsxs(
          Form,
          {
            form,
            name: "register_form",
            layout: "vertical",
            onFinish: submit,
            autoComplete: "off",
            initialValues: data,
            onFieldsChange: (changedFields) => {
              changedFields.forEach((item) => {
                setData(item.name[0], item.value);
              });
            },
            children: [
              /* @__PURE__ */ jsxs("div", { className: "login-text-holder", children: [
                /* @__PURE__ */ jsx("h1", { children: "Create a New Account" }),
                /* @__PURE__ */ jsx("p", { children: "Register with AERO CRM" })
              ] }),
              /* @__PURE__ */ jsx(
                Form.Item,
                {
                  name: "profession",
                  validateStatus: errors.profession && "error",
                  help: errors.profession,
                  rules: [
                    {
                      required: true,
                      message: "Please select your Profession!"
                    }
                  ],
                  children: /* @__PURE__ */ jsx(
                    Select,
                    {
                      disabled: processing,
                      placeholder: "Select Your Profession",
                      options: [
                        {
                          value: "Real Estate Specialist",
                          label: "Real Estate Specialist"
                        },
                        {
                          value: "Affiliate",
                          label: "Affiliate Marketing"
                        }
                      ]
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(
                Form.Item,
                {
                  name: "first_name",
                  validateStatus: errors.first_name && "error",
                  help: errors.first_name,
                  rules: [
                    {
                      required: true,
                      message: "Please input your First Name!"
                    }
                  ],
                  children: /* @__PURE__ */ jsx(
                    Input,
                    {
                      size: "large",
                      prefix: /* @__PURE__ */ jsx(UserOutlined, { className: "site-form-item-icon" }),
                      disabled: processing,
                      placeholder: "First Name"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(
                Form.Item,
                {
                  name: "last_name",
                  validateStatus: errors.last_name && "error",
                  help: errors.last_name,
                  rules: [
                    {
                      required: true,
                      message: "Please input your Last Name!"
                    }
                  ],
                  children: /* @__PURE__ */ jsx(
                    Input,
                    {
                      size: "large",
                      prefix: /* @__PURE__ */ jsx(UserOutlined, { className: "site-form-item-icon" }),
                      disabled: processing,
                      placeholder: "Last Name"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(
                Form.Item,
                {
                  name: "mobile",
                  validateStatus: errors.mobile && "error",
                  help: errors.mobile,
                  rules: [
                    {
                      required: true,
                      message: "Please input your Mobile No!"
                    }
                  ],
                  children: /* @__PURE__ */ jsx(
                    Input,
                    {
                      size: "large",
                      prefix: /* @__PURE__ */ jsx(PhoneOutlined, { className: "site-form-item-icon" }),
                      disabled: processing,
                      placeholder: "Mobile No. Ex: +97150XXXXXXX"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(
                Form.Item,
                {
                  name: "email",
                  rules: [
                    {
                      required: true,
                      message: "Please input your E-mail!"
                    },
                    {
                      type: "email",
                      message: "Invalid E-mail"
                    },
                    {
                      max: 50,
                      message: "E-mail should not exceed 50 characters"
                    }
                  ],
                  validateStatus: errors.email && "error",
                  help: errors.email,
                  children: /* @__PURE__ */ jsx(
                    Input,
                    {
                      size: "large",
                      prefix: /* @__PURE__ */ jsx(MailOutlined, { className: "site-form-item-icon" }),
                      disabled: processing,
                      placeholder: "Email Address",
                      autoComplete: "email"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(
                Form.Item,
                {
                  name: "password",
                  rules: passwordRules,
                  validateStatus: errors.password && "error",
                  help: errors.password,
                  children: /* @__PURE__ */ jsx(
                    Input.Password,
                    {
                      size: "large",
                      prefix: /* @__PURE__ */ jsx(LockOutlined, { className: "site-form-item-icon" }),
                      disabled: processing,
                      placeholder: "Password",
                      autoComplete: "current-password"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(
                Form.Item,
                {
                  name: "password_confirmation",
                  validateStatus: errors.password_confirmation && "error",
                  help: errors.password_confirmation,
                  rules: [
                    {
                      required: true,
                      message: "Please confirm your Password!"
                    }
                  ],
                  children: /* @__PURE__ */ jsx(
                    Input.Password,
                    {
                      size: "large",
                      prefix: /* @__PURE__ */ jsx(LockOutlined, { className: "site-form-item-icon" }),
                      placeholder: "Confirm Password",
                      disabled: processing,
                      autoComplete: "current-password"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(
                Form.Item,
                {
                  name: "referral_code",
                  validateStatus: errors.referral_code && "error",
                  help: errors.referral_code,
                  rules: [
                    {
                      required: true,
                      message: "Please Enter the Referral Code!"
                    }
                  ],
                  children: /* @__PURE__ */ jsx(
                    Input,
                    {
                      size: "large",
                      prefix: /* @__PURE__ */ jsx(CodeOutlined, { className: "site-form-item-icon" }),
                      disabled: processing,
                      placeholder: "Referral Code"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(
                Form.Item,
                {
                  name: "terms",
                  valuePropName: "checked",
                  validateStatus: errors.terms && "error",
                  help: errors.terms,
                  rules: [
                    {
                      required: true,
                      message: "You need to agree the Terms and Conditions"
                    }
                  ],
                  children: /* @__PURE__ */ jsxs(Radio, { children: [
                    " I agree the ",
                    /* @__PURE__ */ jsx("a", { onClick: handleModal, children: "Terms and Conditions" }),
                    " "
                  ] })
                }
              ),
              /* @__PURE__ */ jsx(Form.Item, { className: "form-actions", children: /* @__PURE__ */ jsx(Button, { type: "primary", htmlType: "submit", className: "login-form-button", loading: processing, block: true, children: processing ? "Please Wait" : "Proceed to Payment - AED 200" }) }),
              /* @__PURE__ */ jsxs("div", { className: "form-register", children: [
                /* @__PURE__ */ jsx(Divider, { children: "or" }),
                /* @__PURE__ */ jsx(Link, { href: "/login", children: "Back to Login" })
              ] })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(Modal, { title: "Terms & Conditions", open: isModalOpen, onCancel: handleCancel, footer: null, width: 1e3, children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h3", { children: "Terms and Conditions – User Subscription " }),
      /* @__PURE__ */ jsx("p", {}),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "1. Acceptance of Terms" }) }),
      /* @__PURE__ */ jsx("p", { children: '1.1 By accessing and using the subscription system provided by Aera Capital LLC hereinafter referred to as the "Service Provider," you agree to comply with and be bound by these Terms and Conditions.' }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "2. Subscription Service" }) }),
      /* @__PURE__ */ jsx("p", { children: '2.1 The Service Provider offers a subscription-based service ("Service") that allows users to (Use Aero Real Estate CRM to manage and organize their work with their clients and build a proper information structure).' }),
      /* @__PURE__ */ jsx("p", { children: "2.2 Users must register for a subscription, and by doing so, agree to provide accurate, current, and complete information during the registration process." }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "3. Subscription Plans and Payments" }) }),
      /* @__PURE__ */ jsx("p", { children: "3.1 Users will pay subscription fees offered by the Service Provider. Only 200 AED  Monthly to have full access of all the features which is available on aerorealestatecrm.com" }),
      /* @__PURE__ */ jsx("p", { children: "3.2 Payments for subscription plans are processed in accordance with the chosen billing cycle (monthly). The user authorizes the Service Provider to charge the applicable fees to the chosen payment method." }),
      /* @__PURE__ */ jsx("p", { children: "3.3 The user is responsible for maintaining accurate payment information and ensuring timely payment of subscription fees." }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "4. Usage Policies" }) }),
      /* @__PURE__ */ jsx("p", { children: "4.1 Users agree to use the subscription service in compliance with all applicable laws and regulations In UAE." }),
      /* @__PURE__ */ jsx("p", { children: "4.2 The user shall not engage in any conduct that may disrupt the functionality of the subscription system or compromise its security." }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "5. Termination" }) }),
      /* @__PURE__ */ jsx("p", { children: "5.1 Either party may terminate the subscription with written notice via email in case of non-payment for the renewal fees and also The user is responsible for canceling their subscription before the next billing cycle to avoid additional charges." }),
      /* @__PURE__ */ jsx("p", { children: "5.2 The Service Provider reserves the right to suspend or terminate a user's subscription immediately and without notice in the event of a violation of these terms." }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "6. Privacy and Data Security" }) }),
      /* @__PURE__ */ jsx("p", { children: "6.1 The Service Provider built Data protection Structure in terms of security to avoid any breach or any access to the user data in accordance with its Privacy Policy. It’s forbidden from the service provider to have any access to all the users data." }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "7. Intellectual Property" }) }),
      /* @__PURE__ */ jsx("p", { children: "7.1 The user acknowledges that all content and intellectual property associated with the subscription service are owned by the Service Provider." }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "8. Limitation of Liability" }) }),
      /* @__PURE__ */ jsx("p", { children: "8.1 The Service Provider shall not be liable for any direct, indirect, incidental, special, or consequential damages arising out of the use or inability to use the subscription service." }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "9. Modifications to Terms" }) }),
      /* @__PURE__ */ jsx("p", { children: "9.1 The Service Provider reserves the right to modify these Terms and Conditions at any time. Users will be notified of changes, and continued use implies acceptance of the modified terms." }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "10. Governing Law" }) }),
      /* @__PURE__ */ jsx("p", { children: "10.1 These Terms and Conditions are governed by the laws of United Arab Emirates." }),
      /* @__PURE__ */ jsx("p", {}),
      /* @__PURE__ */ jsx("p", {}),
      /* @__PURE__ */ jsx("h3", { children: "Terms and Conditions – Affiliate Marketing " }),
      /* @__PURE__ */ jsx("p", {}),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "1. Relationship of Parties" }) }),
      /* @__PURE__ */ jsx("p", { children: '1.1 This Agreement ("Agreement") is entered into by and between Aera Capital LLC , hereinafter referred to as the "Merchant," and [Affiliate Name], hereinafter referred to as the "Affiliate."' }),
      /* @__PURE__ */ jsx("p", { children: "1.2 The Affiliate agrees to promote the Merchant's products/services in accordance with the terms and conditions set forth in this Agreement or use the Aero Real Estate CRM Features." }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "2. Commission Structure" }) }),
      /* @__PURE__ */ jsx("p", { children: "2.1 The Merchant agrees to pay the Affiliate a commission based on [each subscription and renewal for Aero Real Estate CRM system under his profile  and for spreading the word of mouth of the company services starting from their social media pages and all platform till their latest project Qalaqs - the first UAE Market Place for Auto Spare Parts  - Amount of 100 AED will be paid per each transaction from the 200 AED Subscription And Renewal Fees] in definition for each qualifying sale generated through the Affiliate's unique tracking link." }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "3. Cookie Duration" }) }),
      /* @__PURE__ */ jsx("p", { children: "3.1 The cookie duration is set at [ 30 days ], during which the Affiliate will receive credit for any customer purchases made after clicking on the affiliate link." }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "4. Payment Terms" }) }),
      /* @__PURE__ */ jsx("p", { children: "4.1 Payments will be made [monthly after the renewal date with 1 to 2 days and the cutoff date for calculating the payout  will be on 25th of each month]." }),
      /* @__PURE__ */ jsx("p", { children: "4.2 Payments will be made via [Bank Transfer Or Money Transfer Channels]." }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "5. Promotional Methods" }) }),
      /* @__PURE__ */ jsx("p", { children: "5.1 The Affiliate agrees to promote the Merchant's products/services using ethical and legal means." }),
      /* @__PURE__ */ jsx("p", { children: "5.2 Prohibited promotional methods include [list prohibited methods such as spam, false advertising, etc.]." }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "6. Brand Guidelines" }) }),
      /* @__PURE__ */ jsx("p", { children: "6.1 The Affiliate agrees to adhere to the Merchant's branding and trademark usage guidelines provided." }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "7. Termination Clause" }) }),
      /* @__PURE__ */ jsx("p", { children: "7.1 Either party may terminate this Agreement with written notice if the other party breaches any material term or condition of this Agreement." }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "8. UAE Compliance" }) }),
      /* @__PURE__ */ jsx("p", { children: "8.1 The Affiliate agrees to comply with all UAE Promoting guidelines regarding the disclosure of their affiliate relationship when promoting the Merchant's products/services." }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "9. Confidentiality" }) }),
      /* @__PURE__ */ jsx("p", { children: "9.1 The Affiliate agrees to keep confidential any non-public information shared by the Merchant." }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "10. Liability" }) }),
      /* @__PURE__ */ jsx("p", { children: "10.1 Each party shall be liable for its own actions and shall not hold the other party liable for any indirect, special, or consequential damages." }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "11. Modification Clause" }) }),
      /* @__PURE__ */ jsx("p", { children: "11.1 The Merchant reserves the right to modify these terms and conditions. Affiliates will be notified of any changes, and continued participation implies acceptance of the modified terms." })
    ] }) })
  ] });
};
export {
  Register as default
};

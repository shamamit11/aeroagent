import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { useForm, Head, Link } from "@inertiajs/react";
import { Form, Select, Input, Radio, Button, Divider } from "antd";
import { UserOutlined, PhoneOutlined, MailOutlined, LockOutlined, CodeOutlined } from "@ant-design/icons";
import { L as Logo } from "./style-ae67b838.js";
const Register = () => {
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
  return /* @__PURE__ */ jsxs("div", { className: "login-page", id: "loginPage", children: [
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
                  /* @__PURE__ */ jsx("a", { href: "#", children: "Terms and Conditions" }),
                  " "
                ] })
              }
            ),
            /* @__PURE__ */ jsx(Form.Item, { className: "form-actions", children: /* @__PURE__ */ jsx(Button, { type: "primary", htmlType: "submit", className: "login-form-button", loading: processing, block: true, children: processing ? "Please Wait" : "Proceed to Payment" }) }),
            /* @__PURE__ */ jsxs("div", { className: "form-register", children: [
              /* @__PURE__ */ jsx(Divider, { children: "or" }),
              /* @__PURE__ */ jsx(Link, { href: "/login", children: "Back to Login" })
            ] })
          ]
        }
      )
    ] })
  ] });
};
export {
  Register as default
};

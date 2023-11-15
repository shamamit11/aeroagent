import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { useForm, Head, Link, router } from "@inertiajs/react";
import { Form, Input, Button, Divider, message } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { L as Logo } from "./style-ae67b838.js";
const ForgotPassword = () => {
  const { data, setData, post, processing, errors } = useForm({
    email: ""
  });
  const [form] = Form.useForm();
  const submit = () => {
    post("/forgot-password", {
      onSuccess: () => {
        message.success("Password Reset Link has been sent !");
      },
      onError: () => {
        message.error("There was an error processing your request. Please try again !");
      },
      onFinish: () => {
        router.get(`/login`);
      }
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "login-page", id: "loginPage", children: [
    /* @__PURE__ */ jsx(Head, { title: "Forgot Password" }),
    /* @__PURE__ */ jsxs("div", { className: "login-form", children: [
      /* @__PURE__ */ jsx("div", { className: "login-form-header", children: /* @__PURE__ */ jsx("img", { src: Logo }) }),
      /* @__PURE__ */ jsxs(
        Form,
        {
          form,
          name: "forgotpassword",
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
              /* @__PURE__ */ jsx("h1", { children: "Reset Password" }),
              /* @__PURE__ */ jsx("p", { children: "Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one." })
            ] }),
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
            /* @__PURE__ */ jsx(Form.Item, { className: "form-actions", children: /* @__PURE__ */ jsx(Button, { type: "primary", htmlType: "submit", className: "login-form-button", loading: processing, block: true, children: processing ? "Please Wait" : "Email Password Reset Link" }) }),
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
  ForgotPassword as default
};

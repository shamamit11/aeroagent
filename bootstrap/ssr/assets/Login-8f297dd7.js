import { jsxs, jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { useForm, Head, Link } from "@inertiajs/react";
import { Form, Input, Button, Divider } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { L as Logo } from "./style-ae67b838.js";
const Login = () => {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false
  });
  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);
  const submit = () => {
    post("/login");
  };
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
  return /* @__PURE__ */ jsxs("div", { className: "login-page", id: "loginPage", children: [
    /* @__PURE__ */ jsx(Head, { title: "Login" }),
    /* @__PURE__ */ jsxs("div", { className: "login-form", children: [
      /* @__PURE__ */ jsx("div", { className: "login-form-header", children: /* @__PURE__ */ jsx("img", { src: Logo }) }),
      /* @__PURE__ */ jsxs(
        Form,
        {
          name: "login",
          layout: "vertical",
          initialValues: data,
          onFieldsChange: (changedFields) => {
            changedFields.forEach((item) => {
              setData(item.name[0], item.value);
            });
          },
          onFinish: submit,
          autoComplete: "off",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "login-text-holder", children: [
              /* @__PURE__ */ jsx("h1", { children: "Sign-In" }),
              /* @__PURE__ */ jsx("p", { children: "Access the Aero RSP Panel using your Email and Password." })
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
            /* @__PURE__ */ jsx(Form.Item, { className: "form-actions", children: /* @__PURE__ */ jsx(Button, { type: "primary", htmlType: "submit", className: "login-form-button", loading: processing, block: true, children: processing ? "Please Wait" : "Log in" }) }),
            /* @__PURE__ */ jsx("div", { className: "form-forgot-password", children: /* @__PURE__ */ jsx(Link, { href: "/forgot-password", children: "Forgot Password?" }) }),
            /* @__PURE__ */ jsxs("div", { className: "form-register", children: [
              /* @__PURE__ */ jsx(Divider, { children: "or" }),
              /* @__PURE__ */ jsx(Link, { href: "/register", children: "Create A New Account" })
            ] })
          ]
        }
      )
    ] })
  ] });
};
export {
  Login as default
};

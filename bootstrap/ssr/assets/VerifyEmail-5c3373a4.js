import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { useForm, Head, Link, router } from "@inertiajs/react";
import { Form, Alert, Button, Divider, message } from "antd";
import { L as Logo } from "./style-ae67b838.js";
const VerifyEmail = ({ status }) => {
  const { post, processing } = useForm();
  const submit = () => {
    post("/email/verification-notification", {
      onSuccess: () => {
        message.success("A new verification link has been sent to the email address you provided during registration.");
      },
      onFinish: () => {
        router.get(`/login`);
      }
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "login-page", id: "loginPage", children: [
    /* @__PURE__ */ jsx(Head, { title: "Email Verification" }),
    /* @__PURE__ */ jsxs("div", { className: "login-form", children: [
      /* @__PURE__ */ jsx("div", { className: "login-form-header", children: /* @__PURE__ */ jsx("img", { src: Logo }) }),
      /* @__PURE__ */ jsxs(
        Form,
        {
          name: "emailverification",
          layout: "vertical",
          onFinish: submit,
          autoComplete: "off",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "login-text-holder", children: [
              /* @__PURE__ */ jsx("h1", { children: "Email Verification" }),
              /* @__PURE__ */ jsx("p", { children: "Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another." })
            ] }),
            status === "verification-link-sent" && /* @__PURE__ */ jsx(
              Alert,
              {
                style: { marginTop: 10, marginBottom: 10 },
                message: "A new verification link has been sent to the email address you provided during registration.",
                type: "success"
              }
            ),
            /* @__PURE__ */ jsx(Form.Item, { className: "form-actions", children: /* @__PURE__ */ jsx(Button, { type: "primary", htmlType: "submit", className: "login-form-button", loading: processing, block: true, children: processing ? "Please Wait" : "Resend Verification Link" }) }),
            /* @__PURE__ */ jsxs("div", { className: "form-register", children: [
              /* @__PURE__ */ jsx(Divider, { children: "or" }),
              /* @__PURE__ */ jsx(Link, { href: "/logout", method: "post", children: "Logout" })
            ] })
          ]
        }
      )
    ] })
  ] });
};
export {
  VerifyEmail as default
};

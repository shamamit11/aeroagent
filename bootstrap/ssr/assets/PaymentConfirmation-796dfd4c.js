import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { Head, router } from "@inertiajs/react";
import { Card, Button, message } from "antd";
import { L as Logo } from "./style-ae67b838.js";
const PaymentConfirmation = () => {
  const userData = JSON.parse(localStorage.getItem("newUser"));
  const handleClick = () => {
    router.post("/register", userData, {
      onSuccess: () => {
        message.success("Your Account has been created successfully !");
        localStorage.removeItem("newUser");
      },
      onFinish: () => {
        router.get(`/login`);
      }
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "login-page", id: "loginPage", children: [
    /* @__PURE__ */ jsx(Head, { title: "Payment Confirmation" }),
    /* @__PURE__ */ jsxs("div", { className: "login-form", children: [
      /* @__PURE__ */ jsx("div", { className: "login-form-header", children: /* @__PURE__ */ jsx("img", { src: Logo }) }),
      /* @__PURE__ */ jsxs(Card, { style: { width: 500 }, children: [
        /* @__PURE__ */ jsxs("div", { className: "login-text-holder", children: [
          /* @__PURE__ */ jsx("h1", { children: "Payment Confirmation" }),
          /* @__PURE__ */ jsx("p", { children: "Your payment is successful. Please click the button below to proceed further with Account Creation." })
        ] }),
        /* @__PURE__ */ jsx(Button, { type: "primary", size: "large", block: true, onClick: handleClick, children: "Proceed with Account Creation" })
      ] })
    ] })
  ] });
};
export {
  PaymentConfirmation as default
};

import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import "react";
import { A as AffiliateLayout } from "./AffiliateLayout-146f8779.js";
import { Head, router } from "@inertiajs/react";
import { Row, Col, Alert, Card, Space, Button } from "antd";
/* empty css                */import "@ant-design/icons";
/* empty css                */import "./light-logo-3220573e.js";
const Confirmation = () => {
  const alertMessage = "You have renewed your Subscription Successfully ! ";
  const handleProceed = () => {
    router.get("/");
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Payment Confirmation" }),
    /* @__PURE__ */ jsx(Row, { justify: "space-between", align: "middle", style: { marginBottom: 20 }, children: /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx("span", { className: "page-title", children: "Payment Confirmation" }) }) }),
    /* @__PURE__ */ jsx(Alert, { message: alertMessage, type: "success" }),
    /* @__PURE__ */ jsx(Card, { style: { marginTop: 20 }, children: /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsx(Space, { size: "large", children: /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx(Button, { size: "large", onClick: handleProceed, children: "Proceed" }) }) }) }) })
  ] });
};
Confirmation.layout = (page) => /* @__PURE__ */ jsx(AffiliateLayout, { children: page });
export {
  Confirmation as default
};

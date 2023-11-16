import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { A as AffiliateLayout } from "./AffiliateLayout-146f8779.js";
import { Head, router } from "@inertiajs/react";
import { Row, Col, Alert, Card, Space, Button, Modal, message } from "antd";
/* empty css                */import "@ant-design/icons";
/* empty css                */import "./light-logo-3220573e.js";
const Index = (props) => {
  const { next_renewal_date, balance } = props;
  const alertMessage = "Your subscription expired on: " + next_renewal_date;
  const alertBalance = "Your Wallet Balance is: AED " + balance;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleStripePayment = () => {
    router.post("/generate-stripe-session", {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    });
  };
  const handleWalletPayment = () => {
    setIsModalOpen(false);
    router.post("/pay-through-wallet", {
      onSuccess: () => {
        message.success("Subscription Renewed Successfully !");
        router.get("/");
      },
      onError: () => {
        message.error("There was an error processing your request. Please try again !");
      },
      onFinish: () => {
        router.get("/");
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
    /* @__PURE__ */ jsx(Head, { title: "Renew Subscription" }),
    /* @__PURE__ */ jsx(Row, { justify: "space-between", align: "middle", style: { marginBottom: 20 }, children: /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx("span", { className: "page-title", children: "Renew Subscription" }) }) }),
    /* @__PURE__ */ jsx(Alert, { message: alertMessage, type: "error" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx(Alert, { message: alertBalance, type: "warning" }),
    /* @__PURE__ */ jsx(Card, { style: { marginTop: 20 }, children: /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsxs(Space, { size: "large", children: [
      balance >= 200 && /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx(Button, { size: "large", onClick: handleModal, children: "Pay using Wallet Balance" }) }),
      /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx(Button, { size: "large", onClick: handleStripePayment, children: "Pay using Stripe" }) })
    ] }) }) }),
    /* @__PURE__ */ jsxs(Modal, { title: "Pay Using Wallet Balance", open: isModalOpen, onCancel: handleCancel, footer: null, children: [
      /* @__PURE__ */ jsxs("div", { style: { fontSize: 16, fontWeight: 500, lineHeight: 2 }, children: [
        "Your current Wallet Balance is: AED ",
        balance,
        /* @__PURE__ */ jsx("br", {}),
        "Remaining Balance after renewal: AED ",
        balance - 200
      ] }),
      /* @__PURE__ */ jsx("div", { style: { marginTop: 15 }, children: /* @__PURE__ */ jsx(Button, { type: "primary", size: "large", onClick: handleWalletPayment, children: "Confirm & Pay Now" }) })
    ] })
  ] });
};
Index.layout = (page) => /* @__PURE__ */ jsx(AffiliateLayout, { children: page });
export {
  Index as default
};

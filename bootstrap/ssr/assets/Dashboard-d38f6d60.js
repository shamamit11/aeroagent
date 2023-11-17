import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { A as AffiliateLayout } from "./AffiliateLayout-146f8779.js";
import { Head, router } from "@inertiajs/react";
import { Card, Row, Col, Statistic, Button } from "antd";
/* empty css                */import "react";
import "@ant-design/icons";
/* empty css                */import "./light-logo-3220573e.js";
const Dashboard = (props) => {
  console.log(props);
  const viewWallet = () => {
    router.get("/wallet");
  };
  const viewReferral = () => {
    router.get("/referral");
  };
  const viewPayout = () => {
    router.get("/wallet/payout");
  };
  const viewRenewal = () => {
    router.get("/wallet/renewal");
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Dashboard" }),
    /* @__PURE__ */ jsx(Card, { title: `Your Referral Code is: ${props.auth.user.user_code}`, children: /* @__PURE__ */ jsxs(Row, { gutter: 24, children: [
      /* @__PURE__ */ jsx(Col, { span: 6, children: /* @__PURE__ */ jsxs(Card, { bordered: false, children: [
        /* @__PURE__ */ jsx(
          Statistic,
          {
            title: "Wallet Balance (AED)",
            value: props.balance,
            precision: 2,
            valueStyle: {
              color: "#3f8600"
            }
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            style: {
              marginTop: 16,
              color: "green",
              borderColor: "green"
            },
            onClick: viewWallet,
            children: "View Wallet"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsx(Col, { span: 6, children: /* @__PURE__ */ jsxs(Card, { bordered: false, children: [
        /* @__PURE__ */ jsx(
          Statistic,
          {
            title: "Total Referrals",
            value: props.totalReferral,
            valueStyle: {
              color: "skyblue"
            }
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            style: {
              marginTop: 16,
              color: "skyblue",
              borderColor: "skyblue"
            },
            onClick: viewReferral,
            children: "View Referrals"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsx(Col, { span: 6, children: /* @__PURE__ */ jsxs(Card, { bordered: false, children: [
        /* @__PURE__ */ jsx(
          Statistic,
          {
            title: "Total Payout (AED)",
            value: props.totalPayout,
            precision: 2,
            valueStyle: {
              color: "orange"
            }
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            style: {
              marginTop: 16,
              color: "orange",
              borderColor: "orange"
            },
            onClick: viewPayout,
            children: "View Payouts"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsx(Col, { span: 6, children: /* @__PURE__ */ jsxs(Card, { bordered: false, children: [
        /* @__PURE__ */ jsx(
          Statistic,
          {
            title: "Next Renewal After",
            value: props.nextRenewalDate,
            valueStyle: {
              color: "#cf1322"
            }
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            style: {
              marginTop: 16,
              color: "#cf1322",
              borderColor: "#cf1322"
            },
            onClick: viewRenewal,
            children: "View Renewals"
          }
        )
      ] }) })
    ] }) })
  ] });
};
Dashboard.layout = (page) => /* @__PURE__ */ jsx(AffiliateLayout, { children: page });
export {
  Dashboard as default
};

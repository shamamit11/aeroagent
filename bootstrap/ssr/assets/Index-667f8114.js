import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { A as AdminLayout } from "./AdminLayout-2b572b0f.js";
import { Head } from "@inertiajs/react";
import { Card, Row, Col, Statistic } from "antd";
import "react";
import "@ant-design/icons";
import "./light-logo-3220573e.js";
/* empty css                */const style = "";
const Dashboard = (props) => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Dashboard" }),
    /* @__PURE__ */ jsx(Card, { title: `Welcome, ${props.auth.user.first_name}`, children: /* @__PURE__ */ jsxs(Row, { gutter: 24, children: [
      /* @__PURE__ */ jsx(Col, { span: 4, children: /* @__PURE__ */ jsx(Card, { bordered: false, children: /* @__PURE__ */ jsx(
        Statistic,
        {
          title: "Total Agents",
          value: props.balance,
          valueStyle: {
            color: "#3f8600"
          }
        }
      ) }) }),
      /* @__PURE__ */ jsx(Col, { span: 4, children: /* @__PURE__ */ jsx(Card, { bordered: false, children: /* @__PURE__ */ jsx(
        Statistic,
        {
          title: "Total Affiliates",
          value: props.totalReferral,
          valueStyle: {
            color: "skyblue"
          }
        }
      ) }) })
    ] }) })
  ] });
};
Dashboard.layout = (page) => /* @__PURE__ */ jsx(AdminLayout, { children: page });
export {
  Dashboard as default
};

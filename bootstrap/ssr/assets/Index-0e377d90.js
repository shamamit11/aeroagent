import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import "react";
import dayjs from "dayjs";
import { A as AgentLayout } from "./AgentLayout-7e278773.js";
import { Head, Link } from "@inertiajs/react";
import { Card, Row, Col, Statistic, Space, DatePicker } from "antd";
import "@ant-design/icons";
/* empty css                */import "./light-logo-3220573e.js";
const style = "";
const { RangePicker } = DatePicker;
const Dashboard = (props) => {
  console.log(props);
  const onChange = (dateString) => {
    console.log(dateString[0]);
  };
  const RangeComponent = () => {
    return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(Space, { size: "middle", children: [
      /* @__PURE__ */ jsx("span", { children: "Select Range: " }),
      /* @__PURE__ */ jsx(RangePicker, { defaultValue: [dayjs(), dayjs()], onChange })
    ] }) });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Dashboard" }),
    /* @__PURE__ */ jsx(Card, { title: `Stats`, extra: /* @__PURE__ */ jsx(RangeComponent, {}), children: /* @__PURE__ */ jsxs(Row, { gutter: 24, children: [
      /* @__PURE__ */ jsx(Col, { span: 4, style: { marginBottom: 24 }, children: /* @__PURE__ */ jsx(Link, { children: /* @__PURE__ */ jsx(Card, { bordered: false, style: { backgroundColor: "#76c52f" }, children: /* @__PURE__ */ jsx(
        Statistic,
        {
          title: "Followups",
          value: props.balance,
          valueStyle: {
            color: "#fff"
          }
        }
      ) }) }) }),
      /* @__PURE__ */ jsx(Col, { span: 4, children: /* @__PURE__ */ jsx(Link, { children: /* @__PURE__ */ jsx(Card, { bordered: false, style: { backgroundColor: "skyblue" }, children: /* @__PURE__ */ jsx(
        Statistic,
        {
          title: "Viewings",
          value: props.balance,
          valueStyle: {
            color: "#fff"
          }
        }
      ) }) }) }),
      /* @__PURE__ */ jsx(Col, { span: 4, children: /* @__PURE__ */ jsx(Link, { children: /* @__PURE__ */ jsx(Card, { bordered: false, style: { backgroundColor: "orange" }, children: /* @__PURE__ */ jsx(
        Statistic,
        {
          title: "Meetings",
          value: props.balance,
          valueStyle: {
            color: "#fff"
          }
        }
      ) }) }) })
    ] }) }),
    /* @__PURE__ */ jsx(Card, { title: `Property Stats`, style: { marginTop: 25 }, children: /* @__PURE__ */ jsxs(Row, { gutter: 24, children: [
      /* @__PURE__ */ jsx(Col, { span: 4, style: { marginBottom: 24 }, children: /* @__PURE__ */ jsx(Link, { children: /* @__PURE__ */ jsx(Card, { bordered: false, style: { backgroundColor: "#bbbbbb" }, children: /* @__PURE__ */ jsx(
        Statistic,
        {
          title: "Apartments",
          value: props.balance,
          valueStyle: {
            color: "#fff"
          }
        }
      ) }) }) }),
      /* @__PURE__ */ jsx(Col, { span: 4, children: /* @__PURE__ */ jsx(Link, { children: /* @__PURE__ */ jsx(Card, { bordered: false, style: { backgroundColor: "#ca2c2c" }, children: /* @__PURE__ */ jsx(
        Statistic,
        {
          title: "Villas",
          value: props.balance,
          valueStyle: {
            color: "#fff"
          }
        }
      ) }) }) }),
      /* @__PURE__ */ jsx(Col, { span: 4, children: /* @__PURE__ */ jsx(Link, { children: /* @__PURE__ */ jsx(Card, { bordered: false, style: { backgroundColor: "#6ec4d7" }, children: /* @__PURE__ */ jsx(
        Statistic,
        {
          title: "Town Houses",
          value: props.balance,
          valueStyle: {
            color: "#fff"
          }
        }
      ) }) }) }),
      /* @__PURE__ */ jsx(Col, { span: 4, children: /* @__PURE__ */ jsx(Link, { children: /* @__PURE__ */ jsx(Card, { bordered: false, style: { backgroundColor: "#b373b3" }, children: /* @__PURE__ */ jsx(
        Statistic,
        {
          title: "Pent Houses",
          value: props.balance,
          valueStyle: {
            color: "#fff"
          }
        }
      ) }) }) }),
      /* @__PURE__ */ jsx(Col, { span: 4, children: /* @__PURE__ */ jsx(Link, { children: /* @__PURE__ */ jsx(Card, { bordered: false, style: { backgroundColor: "#e773e7" }, children: /* @__PURE__ */ jsx(
        Statistic,
        {
          title: "Offices",
          value: props.balance,
          valueStyle: {
            color: "#fff"
          }
        }
      ) }) }) }),
      /* @__PURE__ */ jsx(Col, { span: 4, children: /* @__PURE__ */ jsx(Link, { children: /* @__PURE__ */ jsx(Card, { bordered: false, style: { backgroundColor: "pink" }, children: /* @__PURE__ */ jsx(
        Statistic,
        {
          title: "Retail / Shops",
          value: props.balance,
          valueStyle: {
            color: "#fff"
          }
        }
      ) }) }) }),
      /* @__PURE__ */ jsx(Col, { span: 4, children: /* @__PURE__ */ jsx(Link, { children: /* @__PURE__ */ jsx(Card, { bordered: false, style: { backgroundColor: "#1fadad" }, children: /* @__PURE__ */ jsx(
        Statistic,
        {
          title: "Lands",
          value: props.balance,
          valueStyle: {
            color: "#fff"
          }
        }
      ) }) }) }),
      /* @__PURE__ */ jsx(Col, { span: 4, children: /* @__PURE__ */ jsx(Link, { children: /* @__PURE__ */ jsx(Card, { bordered: false, style: { backgroundColor: "#e5b34e" }, children: /* @__PURE__ */ jsx(
        Statistic,
        {
          title: "Factory",
          value: props.balance,
          valueStyle: {
            color: "#fff"
          }
        }
      ) }) }) }),
      /* @__PURE__ */ jsx(Col, { span: 4, children: /* @__PURE__ */ jsx(Link, { children: /* @__PURE__ */ jsx(Card, { bordered: false, style: { backgroundColor: "#737add" }, children: /* @__PURE__ */ jsx(
        Statistic,
        {
          title: "Hotel Apartments",
          value: props.balance,
          valueStyle: {
            color: "#fff"
          }
        }
      ) }) }) })
    ] }) })
  ] });
};
Dashboard.layout = (page) => /* @__PURE__ */ jsx(AgentLayout, { children: page });
export {
  Dashboard as default
};

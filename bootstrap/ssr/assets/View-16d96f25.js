import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { A as AgentLayout } from "./AgentLayout-7e278773.js";
import { usePage, Head, router } from "@inertiajs/react";
import { Card, Row, Col, Button, Tabs } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import TabInfo from "./TabInfo-d3054c8f.js";
import TabDetail from "./TabDetail-9f873c97.js";
import TabDetail$1 from "./TabDoc-0f8055c8.js";
/* empty css                *//* empty css                */import "./light-logo-3220573e.js";
/* empty css                */const View = () => {
  const props = usePage().props;
  const rowData = props.row;
  const handleBack = () => {
    router.get("/project");
  };
  const items = [
    {
      key: "1",
      label: "Info",
      children: /* @__PURE__ */ jsx(TabInfo, {})
    },
    {
      key: "2",
      label: "Details",
      children: /* @__PURE__ */ jsx(TabDetail, {})
    },
    {
      key: "3",
      label: "Documents",
      children: /* @__PURE__ */ jsx(TabDetail$1, {})
    }
  ];
  return /* @__PURE__ */ jsxs(Card, { bordered: false, style: { width: "100%", borderRadius: 0, paddingBottom: 20 }, children: [
    /* @__PURE__ */ jsx(Head, { title: rowData.name }),
    /* @__PURE__ */ jsxs(Row, { justify: "space-between", align: "middle", style: { marginBottom: 20, marginTop: 5 }, children: [
      /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx("span", { className: "page-title", children: rowData.name }) }),
      /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx(Button, { style: { color: "blue", borderColor: "blue" }, shape: "circle", icon: /* @__PURE__ */ jsx(ArrowLeftOutlined, {}), size: "middle", onClick: handleBack }) })
    ] }),
    /* @__PURE__ */ jsx(Tabs, { defaultActiveKey: "1", items })
  ] });
};
View.layout = (page) => /* @__PURE__ */ jsx(AgentLayout, { children: page });
export {
  View as default
};

import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { A as AffiliateLayout } from "./AffiliateLayout-146f8779.js";
import { Head } from "@inertiajs/react";
import { Card, Row, Col, Divider, Tabs } from "antd";
import { UserOutlined, LockOutlined, BankOutlined } from "@ant-design/icons";
import SettingProfile from "./Profile-d1348e58.js";
import SettingPassword from "./Password-0435e0f3.js";
import SettingBank from "./Bank-8099bc60.js";
/* empty css                *//* empty css                */import "./light-logo-3220573e.js";
const tabItems = [
  {
    key: "profile",
    label: /* @__PURE__ */ jsxs("span", { children: [
      /* @__PURE__ */ jsx(UserOutlined, {}),
      "Profile"
    ] }),
    children: /* @__PURE__ */ jsx(SettingProfile, {})
  },
  {
    key: "password",
    label: /* @__PURE__ */ jsxs("span", { children: [
      /* @__PURE__ */ jsx(LockOutlined, {}),
      "Change Password"
    ] }),
    children: /* @__PURE__ */ jsx(SettingPassword, {})
  },
  {
    key: "bank",
    label: /* @__PURE__ */ jsxs("span", { children: [
      /* @__PURE__ */ jsx(BankOutlined, {}),
      "Bank Information"
    ] }),
    children: /* @__PURE__ */ jsx(SettingBank, {})
  }
];
const Index = () => {
  const initialTab = JSON.parse(localStorage.getItem("settingTab")) || "profile";
  const [defaultTab, setDefaultTab] = useState(initialTab);
  const onChange = (key) => {
    const updated = key;
    setDefaultTab(updated);
    localStorage.setItem("settingTab", JSON.stringify(updated));
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Settings" }),
    /* @__PURE__ */ jsxs(Card, { bordered: false, style: { width: "100%", borderRadius: 0, paddingBottom: 20 }, children: [
      /* @__PURE__ */ jsx(Row, { justify: "space-between", align: "middle", style: { marginBottom: 20, marginTop: 5 }, children: /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx("span", { className: "page-title", children: "Settings" }) }) }),
      /* @__PURE__ */ jsx(Divider, {}),
      /* @__PURE__ */ jsx(
        Tabs,
        {
          tabPosition: "left",
          defaultActiveKey: defaultTab,
          items: tabItems,
          onChange
        }
      )
    ] })
  ] });
};
Index.layout = (page) => /* @__PURE__ */ jsx(AffiliateLayout, { children: page });
export {
  Index as default
};

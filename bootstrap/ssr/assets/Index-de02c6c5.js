import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { A as AdminLayout } from "./AdminLayout-272e4a16.js";
import { Head } from "@inertiajs/react";
import { Card, Row, Col, Divider, Tabs } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import SettingProfile from "./Profile-f1402222.js";
import SettingPassword from "./Password-3358bdb0.js";
/* empty css                */import "./light-logo-3220573e.js";
/* empty css                */const tabItems = [
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
  }
];
const Index = () => {
  const initialTab = JSON.parse(localStorage.getItem("adminSettingTab")) || "profile";
  const [defaultTab, setDefaultTab] = useState(initialTab);
  const onChange = (key) => {
    const updated = key;
    setDefaultTab(updated);
    localStorage.setItem("adminSettingTab", JSON.stringify(updated));
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
Index.layout = (page) => /* @__PURE__ */ jsx(AdminLayout, { children: page });
export {
  Index as default
};

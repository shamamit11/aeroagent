import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { WalletOutlined, MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, CaretDownOutlined, SettingOutlined, LogoutOutlined } from "@ant-design/icons";
import { Layout, Menu, Row, Col, Button, Dropdown, Typography, Space, Avatar } from "antd";
import { Link, usePage } from "@inertiajs/react";
/* empty css                */import { L as Logo } from "./light-logo-3220573e.js";
const affiliateNavItems = [
  {
    key: "wallet",
    icon: /* @__PURE__ */ jsx(WalletOutlined, {}),
    label: /* @__PURE__ */ jsx(Link, { href: "/wallet-dashboard", children: "Wallet" })
  }
];
const { Header, Sider, Content, Footer } = Layout;
const items = [
  {
    key: "settings",
    label: /* @__PURE__ */ jsx(Link, { href: "/settings", children: "Settings" }),
    icon: /* @__PURE__ */ jsx(SettingOutlined, {})
  },
  {
    type: "divider"
  },
  {
    key: "logout",
    label: /* @__PURE__ */ jsx(Link, { href: "/logout", method: "post", as: "div", children: "Logout" }),
    icon: /* @__PURE__ */ jsx(LogoutOutlined, {})
  }
];
const AffiliateLayout = ({ children }) => {
  const { auth } = usePage().props;
  auth.user.role;
  const initial = JSON.parse(localStorage.getItem("sidebarCollapsed")) || false;
  const [collapsed, setCollapsed] = useState(initial);
  const toggleCollapse = () => {
    const updated = !collapsed;
    setCollapsed(updated);
    localStorage.setItem("sidebarCollapsed", JSON.stringify(updated));
  };
  return /* @__PURE__ */ jsxs(Layout, { className: "app-layout", children: [
    /* @__PURE__ */ jsxs(
      Sider,
      {
        trigger: null,
        collapsible: true,
        collapsed,
        style: {
          overflow: "auto"
        },
        children: [
          /* @__PURE__ */ jsx("div", { className: "sidebar-logo", children: /* @__PURE__ */ jsx("img", { src: Logo }) }),
          /* @__PURE__ */ jsx(
            Menu,
            {
              theme: "dark",
              mode: "inline",
              defaultSelectedKeys: [route().current()],
              items: affiliateNavItems
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxs(Layout, { children: [
      /* @__PURE__ */ jsx(Header, { className: "app-header", children: /* @__PURE__ */ jsxs(Row, { justify: "space-between", children: [
        /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx(
          Button,
          {
            type: "text",
            icon: collapsed ? /* @__PURE__ */ jsx(MenuUnfoldOutlined, {}) : /* @__PURE__ */ jsx(MenuFoldOutlined, {}),
            onClick: () => toggleCollapse(),
            style: {
              fontSize: "16px",
              width: 64,
              height: 64
            }
          }
        ) }),
        /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx(Dropdown, { menu: { items }, trigger: ["click"], placement: "bottom", arrow: true, children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("a", { onClick: (e) => e.preventDefault(), children: /* @__PURE__ */ jsx(Typography.Text, { className: "auth-dropdown", children: /* @__PURE__ */ jsxs(Space, { size: 12, children: [
          !auth.user_image && /* @__PURE__ */ jsx(Avatar, { size: 36, icon: /* @__PURE__ */ jsx(UserOutlined, {}) }),
          auth.user_image && /* @__PURE__ */ jsx(Avatar, { size: 36, src: auth.user_image }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(Typography.Text, { strong: true, children: [
              auth.user.first_name,
              " ",
              auth.user.last_name
            ] }) }),
            /* @__PURE__ */ jsx("div", { children: auth.user.email })
          ] }),
          /* @__PURE__ */ jsx(CaretDownOutlined, {})
        ] }) }) }) }) }) })
      ] }) }),
      /* @__PURE__ */ jsx(Content, { className: "main-content-layout", children }),
      /* @__PURE__ */ jsxs(Footer, { className: "app-footer", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          "AERO Real Estate CRM © 2023. Powered By: ",
          /* @__PURE__ */ jsx("a", { href: "https://aera-capital.com", target: "_blank", rel: "noopener noreferrer", children: "Aera Capital LLC" })
        ] }),
        /* @__PURE__ */ jsx("div", { children: "App Version: 1.0.0" })
      ] })
    ] })
  ] });
};
export {
  AffiliateLayout as A
};

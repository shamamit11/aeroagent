import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { DashboardOutlined, WalletOutlined, UserOutlined, PullRequestOutlined, PhoneOutlined, UsergroupAddOutlined, EyeOutlined, ShopOutlined, AppstoreOutlined, GlobalOutlined, MenuUnfoldOutlined, MenuFoldOutlined, CaretDownOutlined, SettingOutlined, LineChartOutlined, LogoutOutlined } from "@ant-design/icons";
import { Layout, Menu, Row, Col, Button, Dropdown, Typography, Space, Avatar } from "antd";
import { Link, usePage } from "@inertiajs/react";
/* empty css                */import { L as Logo } from "./light-logo-3220573e.js";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type
  };
}
const agentNavItems = [
  {
    key: "dashboard",
    icon: /* @__PURE__ */ jsx(DashboardOutlined, {}),
    label: /* @__PURE__ */ jsx(Link, { href: "/dashboard", children: "Dashboard" })
  },
  {
    key: "wallet",
    icon: /* @__PURE__ */ jsx(WalletOutlined, {}),
    label: /* @__PURE__ */ jsx(Link, { href: "/wallet-dashboard", children: "Wallet" })
  },
  getItem("Data Management", "customermanagement", null, [], "group"),
  {
    key: "customer",
    icon: /* @__PURE__ */ jsx(UserOutlined, {}),
    label: /* @__PURE__ */ jsx(Link, { href: "/customer", children: "List Customers" })
  },
  {
    key: "seller",
    icon: /* @__PURE__ */ jsx(UserOutlined, {}),
    label: /* @__PURE__ */ jsx(Link, { href: "/seller", children: "Sellers" })
  },
  {
    key: "buyers",
    icon: /* @__PURE__ */ jsx(UserOutlined, {}),
    label: /* @__PURE__ */ jsx(Link, { href: "/buyer", children: "Buyers" })
  },
  {
    key: "leaser",
    icon: /* @__PURE__ */ jsx(UserOutlined, {}),
    label: /* @__PURE__ */ jsx(Link, { href: "/leaser", children: "Leasers" })
  },
  {
    key: "tenant",
    icon: /* @__PURE__ */ jsx(UserOutlined, {}),
    label: /* @__PURE__ */ jsx(Link, { href: "/tenant", children: "Tenants" })
  },
  getItem("Requests Management", "requestmanagement", null, [], "group"),
  {
    key: "sellerrequest",
    icon: /* @__PURE__ */ jsx(PullRequestOutlined, {}),
    label: /* @__PURE__ */ jsx(Link, { href: "/request-seller", children: "Seller Requests" })
  },
  {
    key: "buyerrequest",
    icon: /* @__PURE__ */ jsx(PullRequestOutlined, {}),
    label: /* @__PURE__ */ jsx(Link, { href: "/request-buyer", children: "Buyer Requests" })
  },
  {
    key: "leaserrequest",
    icon: /* @__PURE__ */ jsx(PullRequestOutlined, {}),
    label: /* @__PURE__ */ jsx(Link, { href: "/request-leaser", children: "Leaser Requests" })
  },
  {
    key: "tenantrequest",
    icon: /* @__PURE__ */ jsx(PullRequestOutlined, {}),
    label: /* @__PURE__ */ jsx(Link, { href: "/request-tenant", children: "Tenant Requests" })
  },
  getItem("Customer Activities", "customeractivity", null, [], "group"),
  {
    key: "followup",
    icon: /* @__PURE__ */ jsx(PhoneOutlined, {}),
    label: /* @__PURE__ */ jsx(Link, { href: "/followup", children: "Follow ups" })
  },
  {
    key: "meeting",
    icon: /* @__PURE__ */ jsx(UsergroupAddOutlined, {}),
    label: /* @__PURE__ */ jsx(Link, { href: "/meeting", children: "Meetings" })
  },
  {
    key: "viewing",
    icon: /* @__PURE__ */ jsx(EyeOutlined, {}),
    label: /* @__PURE__ */ jsx(Link, { href: "/viewing", children: "Viewings" })
  },
  getItem("Project Management", "projectmanagement", null, [], "group"),
  {
    key: "developer",
    icon: /* @__PURE__ */ jsx(ShopOutlined, {}),
    label: /* @__PURE__ */ jsx(Link, { href: "/developer", children: "Developers" })
  },
  {
    key: "project",
    icon: /* @__PURE__ */ jsx(AppstoreOutlined, {}),
    label: /* @__PURE__ */ jsx(Link, { href: "/project", children: "Projects" })
  },
  getItem("Other Configurations", "systemconfig", null, [], "group"),
  {
    key: "location",
    icon: /* @__PURE__ */ jsx(GlobalOutlined, {}),
    label: /* @__PURE__ */ jsx(Link, { href: "/location", children: "Locations" })
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
    key: "logs",
    label: /* @__PURE__ */ jsx(Link, { href: "/activity-log", children: "Activity Log" }),
    icon: /* @__PURE__ */ jsx(LineChartOutlined, {})
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
const AgentLayout = ({ children }) => {
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
              items: agentNavItems
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
  AgentLayout as A
};

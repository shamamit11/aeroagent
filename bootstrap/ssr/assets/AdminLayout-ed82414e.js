import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { DashboardOutlined, BgColorsOutlined, ApartmentOutlined, GoldOutlined, HomeOutlined, SwitcherOutlined, MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, CaretDownOutlined, SettingOutlined, LineChartOutlined, LogoutOutlined } from "@ant-design/icons";
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
const adminNavItems = [
  {
    key: "dashboard",
    icon: /* @__PURE__ */ jsx(DashboardOutlined, {}),
    label: /* @__PURE__ */ jsx(Link, { href: "/admin/dashboard", children: "Dashboard" })
  },
  getItem("Users Management", "usermanagement", null, [], "group"),
  {
    key: "user",
    icon: /* @__PURE__ */ jsx(BgColorsOutlined, {}),
    label: /* @__PURE__ */ jsx(Link, { href: "/admin/user", children: "Users" })
  },
  {
    key: "payout",
    icon: /* @__PURE__ */ jsx(BgColorsOutlined, {}),
    label: /* @__PURE__ */ jsx(Link, { href: "/admin/payout", children: "Payout" })
  },
  {
    key: "listPayout",
    icon: /* @__PURE__ */ jsx(BgColorsOutlined, {}),
    label: /* @__PURE__ */ jsx(Link, { href: "/admin/payout/list", children: "List All Payout" })
  },
  getItem("System Configurations", "systemconfig", null, [], "group"),
  {
    key: "status",
    icon: /* @__PURE__ */ jsx(BgColorsOutlined, {}),
    label: /* @__PURE__ */ jsx(Link, { href: "/admin/status", children: "Statuses" })
  },
  {
    key: "amenity",
    icon: /* @__PURE__ */ jsx(ApartmentOutlined, {}),
    label: /* @__PURE__ */ jsx(Link, { href: "/admin/amenity", children: "Amenities" })
  },
  {
    key: "activityType",
    icon: /* @__PURE__ */ jsx(GoldOutlined, {}),
    label: /* @__PURE__ */ jsx(Link, { href: "/admin/activityType", children: "Activity Types" })
  },
  {
    key: "property",
    icon: /* @__PURE__ */ jsx(HomeOutlined, {}),
    label: /* @__PURE__ */ jsx(Link, { href: "/admin/property", children: "Properties" })
  },
  {
    key: "propertyType",
    icon: /* @__PURE__ */ jsx(SwitcherOutlined, {}),
    label: /* @__PURE__ */ jsx(Link, { href: "/admin/propertyType", children: "Property Type" })
  }
];
const { Header, Sider, Content, Footer } = Layout;
const items = [
  {
    key: "settings",
    label: /* @__PURE__ */ jsx(Link, { href: "/admin/settings", children: "Settings" }),
    icon: /* @__PURE__ */ jsx(SettingOutlined, {})
  },
  {
    key: "logs",
    label: /* @__PURE__ */ jsx(Link, { href: "/admin/activity-log", children: "Activity Log" }),
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
const AdminLayout = ({ children }) => {
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
              items: adminNavItems
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
  AdminLayout as A
};

import { jsx, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Menu } from "antd";
import { Link } from "@inertiajs/react";
const style = "";
const CustomerPageNav = () => {
  const customerPageSubMenu = JSON.parse(localStorage.getItem("defaultCustomerSubMenu")) || [route().current()];
  const [currentCustonerPageSubMenu, setCurrentCustomerPageSubMenu] = useState(customerPageSubMenu);
  const onCustomerSubMenuClick = (e) => {
    setCurrentCustomerPageSubMenu(e.key);
    localStorage.setItem("defaultCustomerSubMenu", JSON.stringify(e.key));
  };
  const navItems = [
    {
      key: "customer",
      label: /* @__PURE__ */ jsx(Link, { href: "/customer", children: "List All Customers" })
    },
    {
      key: "seller",
      label: "Add New Customer"
    },
    {
      key: "buyer",
      label: "Buyers"
    },
    {
      key: "tenant",
      label: "Tenants"
    },
    {
      key: "leaser",
      label: "Leasers"
    }
  ];
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "customers", children: /* @__PURE__ */ jsx(Menu, { onClick: onCustomerSubMenuClick, defaultSelectedKeys: [route().current()], selectedKeys: [currentCustonerPageSubMenu], mode: "horizontal", items: navItems }) }) });
};
export {
  CustomerPageNav as default
};

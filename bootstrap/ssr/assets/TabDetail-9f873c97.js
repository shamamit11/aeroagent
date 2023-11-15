import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import "react";
import { usePage } from "@inertiajs/react";
import { Table } from "antd";
/* empty css                */const TabDetail = () => {
  const props = usePage().props;
  const units = props.units;
  const columns = [
    {
      title: "Property",
      key: "property",
      width: "auto",
      render: (_, record) => /* @__PURE__ */ jsxs("span", { children: [
        record.property,
        " / ",
        record.property_type
      ] })
    },
    {
      title: "Total Units",
      dataIndex: "total_units",
      key: "total_units",
      width: "15%",
      align: "center"
    },
    {
      title: "Sizes (sq.ft)",
      key: "sizes",
      width: "18%",
      align: "center",
      render: (_, record) => /* @__PURE__ */ jsxs("span", { children: [
        record.size_from,
        " - ",
        record.size_to
      ] })
    },
    {
      title: "Price Range",
      key: "price_range",
      width: "18%",
      render: (_, record) => /* @__PURE__ */ jsxs("span", { children: [
        "AED ",
        record.price_from,
        " - ",
        record.price_to
      ] })
    }
  ];
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "table-holder", children: /* @__PURE__ */ jsx(Table, { columns, dataSource: units, rowKey: (key) => key.id, pagination: { defaultPageSize: 50 } }) }) });
};
export {
  TabDetail as default
};

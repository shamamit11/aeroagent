import { jsx, Fragment } from "react/jsx-runtime";
import "react";
import { usePage } from "@inertiajs/react";
import { Table } from "antd";
/* empty css                */const TabDetail = () => {
  const props = usePage().props;
  const docs = props.documents;
  const columns = [
    {
      title: "Document Type",
      dataIndex: "doc_type",
      key: "doc_type",
      width: "20%"
    },
    {
      title: "Link",
      key: "link",
      width: "auto",
      render: (_, record) => /* @__PURE__ */ jsx("a", { href: record.link, target: "_blank", children: record.link })
    }
  ];
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "table-holder", children: /* @__PURE__ */ jsx(Table, { columns, dataSource: docs, rowKey: (key) => key.id, pagination: { defaultPageSize: 50 } }) }) });
};
export {
  TabDetail as default
};

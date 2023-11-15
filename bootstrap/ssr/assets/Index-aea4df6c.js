import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { A as AgentLayout } from "./AgentLayout-55444b12.js";
import { usePage, Head, router } from "@inertiajs/react";
import { Card, Row, Col, Space, Button, Table, Tooltip, Popconfirm, message } from "antd";
import { ArrowLeftOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
/* empty css                *//* empty css                */const Index = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const { project, results } = usePage().props;
  useEffect(() => {
    setData(results);
    setLoading(false);
  }, []);
  const handleBack = () => {
    router.get("/project");
  };
  const handleAdd = () => {
    router.get(`/project/detail/addEdit?id=${0}&pid=${project.id}`);
  };
  const handleEdit = (id) => {
    router.get(`/project/detail/addEdit?id=${id}&pid=${project.id}`);
  };
  const handleDelete = (id) => {
    const formData = {
      id,
      project_id: project.id
    };
    router.post("/project/detail/delete", formData, {
      onSuccess: () => {
        message.success("Data Deleted Successfully !");
      },
      onFinish: () => {
        router.get(`/project/detail?pid=${project.id}`);
      }
    });
  };
  const handleCancel = () => {
    message.error("Operation Cancelled !");
  };
  const columns = [
    {
      title: "Property",
      key: "property",
      width: "auto",
      render: (_, record) => /* @__PURE__ */ jsx(Space, { children: /* @__PURE__ */ jsxs("span", { children: [
        record.property,
        " / ",
        record.property_type
      ] }) })
    },
    {
      title: "Total Units",
      dataIndex: "total_units",
      key: "total_units",
      width: "10%",
      align: "center"
    },
    {
      title: "Sizes (sq.ft)",
      key: "sizes",
      width: "15%",
      render: (_, record) => /* @__PURE__ */ jsx(Space, { children: /* @__PURE__ */ jsxs("span", { children: [
        record.size_from,
        " - ",
        record.size_to
      ] }) })
    },
    {
      title: "Price Range",
      key: "price_range",
      width: "15%",
      render: (_, record) => /* @__PURE__ */ jsx(Space, { children: /* @__PURE__ */ jsxs("span", { children: [
        "AED ",
        record.price_from,
        " - ",
        record.price_to
      ] }) })
    },
    {
      title: "",
      key: "action",
      width: "8%",
      render: (_, record) => /* @__PURE__ */ jsxs(Space, { size: "middle", children: [
        /* @__PURE__ */ jsx(Tooltip, { title: "Edit Row", color: "orange", children: /* @__PURE__ */ jsx(Button, { style: { color: "orange", borderColor: "orange" }, size: "middle", shape: "circle", icon: /* @__PURE__ */ jsx(EditOutlined, {}), onClick: () => handleEdit(record.id) }) }),
        /* @__PURE__ */ jsx(
          Popconfirm,
          {
            title: "Delete",
            description: "Are you sure to delete?",
            onConfirm: () => handleDelete(record.id),
            onCancel: handleCancel,
            okText: "Yes",
            cancelText: "No",
            children: /* @__PURE__ */ jsx(Tooltip, { title: "Delete Row", color: "red", children: /* @__PURE__ */ jsx(Button, { danger: true, size: "middle", shape: "circle", icon: /* @__PURE__ */ jsx(DeleteOutlined, {}) }) })
          }
        )
      ] })
    }
  ];
  return /* @__PURE__ */ jsxs(Card, { bordered: false, style: { width: "100%", borderRadius: 0, paddingBottom: 20 }, children: [
    /* @__PURE__ */ jsx(Head, { title: "Project Detail" }),
    /* @__PURE__ */ jsxs(Row, { justify: "space-between", align: "middle", style: { marginBottom: 20, marginTop: 5 }, children: [
      /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx("span", { className: "page-title", children: project.name }) }),
      /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsxs(Space, { size: "middle", children: [
        /* @__PURE__ */ jsx(Button, { shape: "circle", icon: /* @__PURE__ */ jsx(ArrowLeftOutlined, {}), size: "large", onClick: handleBack }),
        /* @__PURE__ */ jsx(Button, { style: { color: "blue", borderColor: "blue" }, shape: "circle", icon: /* @__PURE__ */ jsx(PlusOutlined, {}), size: "middle", onClick: handleAdd })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "table-holder", children: /* @__PURE__ */ jsx(Table, { columns, dataSource: data, rowKey: (key) => key.id, loading, pagination: { defaultPageSize: 50 } }) })
  ] });
};
Index.layout = (page) => /* @__PURE__ */ jsx(AgentLayout, { children: page });
export {
  Index as default
};

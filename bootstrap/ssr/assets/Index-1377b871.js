import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { A as AgentLayout } from "./AgentLayout-7e278773.js";
import { usePage, Head, router } from "@inertiajs/react";
import { Card, Row, Col, Space, Button, Table, Badge, Tooltip, Popconfirm, Input } from "antd";
import { PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
/* empty css                *//* empty css                */import "./light-logo-3220573e.js";
const Index = () => {
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [data, setData] = useState();
  const { results } = usePage().props;
  useEffect(() => {
    setData(results);
    setLoading(false);
  }, []);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const handleAdd = () => {
    router.get("/buyer/addEdit");
  };
  const handleImport = () => {
    router.get("/buyer/import");
  };
  const handleDetail = (id) => {
    router.get(`/buyer/detail?id=${id}`);
  };
  const handleEdit = (id) => {
    router.get(`/buyer/addEdit?id=${id}`);
  };
  const handleDelete = (id) => {
    const formData = {
      id
    };
    router.post("/buyer/delete", formData, {
      onSuccess: () => {
        message.success("Data Deleted Successfully !");
      },
      onFinish: () => {
        router.get(`/buyer`);
      }
    });
  };
  const handleCancel = () => {
    message.error("Operation Cancelled !");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => /* @__PURE__ */ jsxs(
      "div",
      {
        style: {
          padding: 8
        },
        onKeyDown: (e) => e.stopPropagation(),
        children: [
          /* @__PURE__ */ jsx(
            Input,
            {
              ref: searchInput,
              placeholder: `Search ${dataIndex}`,
              value: selectedKeys[0],
              onChange: (e) => setSelectedKeys(e.target.value ? [e.target.value] : []),
              onPressEnter: () => handleSearch(selectedKeys, confirm, dataIndex),
              style: {
                marginBottom: 8,
                display: "block"
              }
            }
          ),
          /* @__PURE__ */ jsxs(Space, { children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                type: "primary",
                onClick: () => handleSearch(selectedKeys, confirm, dataIndex),
                size: "small",
                style: {
                  width: 90
                },
                children: "Search"
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                onClick: () => clearFilters && handleReset(clearFilters),
                size: "small",
                style: {
                  width: 90
                },
                children: "Reset"
              }
            )
          ] })
        ]
      }
    ),
    filterIcon: (filtered) => /* @__PURE__ */ jsx(
      SearchOutlined,
      {
        style: {
          color: filtered ? "#1677ff" : void 0
        }
      }
    ),
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          var _a;
          return (_a = searchInput.current) == null ? void 0 : _a.select();
        }, 100);
      }
    },
    render: (text) => searchedColumn === dataIndex ? /* @__PURE__ */ jsx(
      Highlighter,
      {
        highlightStyle: {
          backgroundColor: "#ffc069",
          padding: 0
        },
        searchWords: [searchText],
        autoEscape: true,
        textToHighlight: text ? text.toString() : ""
      }
    ) : text
  });
  const columns = [
    {
      title: "Customer Name",
      dataIndex: "customer_name",
      key: "customer_name",
      width: "auto",
      ...getColumnSearchProps("customer_name")
    },
    {
      title: "Mobile",
      dataIndex: "customer_mobile",
      key: "customer_mobile",
      width: "15%",
      ...getColumnSearchProps("customer_mobile")
    },
    {
      title: "Property",
      dataIndex: "property",
      key: "property",
      width: "13%",
      ...getColumnSearchProps("property")
    },
    {
      title: "Property Type",
      dataIndex: "property_type",
      key: "property_type",
      width: "13%",
      ...getColumnSearchProps("property_type")
    },
    {
      title: "Project",
      dataIndex: "project_name",
      key: "project_name",
      width: "15%",
      ...getColumnSearchProps("project_name")
    },
    {
      title: "Status",
      key: "status",
      width: "10%",
      align: "center",
      ...getColumnSearchProps("status"),
      render: (_, record) => /* @__PURE__ */ jsx(Badge, { color: record.status_color, count: record.status })
    },
    {
      title: "",
      key: "action",
      width: "13%",
      align: "center",
      render: (_, record) => /* @__PURE__ */ jsxs(Space, { size: "middle", children: [
        /* @__PURE__ */ jsx(Tooltip, { title: "View Detail", color: "blue", children: /* @__PURE__ */ jsx(Button, { style: { color: "blue", borderColor: "blue" }, size: "middle", shape: "circle", icon: /* @__PURE__ */ jsx(EyeOutlined, {}), onClick: () => handleDetail(record.id) }) }),
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
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Buyers" }),
    /* @__PURE__ */ jsxs(Card, { bordered: false, style: { width: "100%", borderRadius: 0, paddingBottom: 20 }, children: [
      /* @__PURE__ */ jsxs(Row, { justify: "space-between", align: "middle", style: { marginBottom: 20, marginTop: 5 }, children: [
        /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx("span", { className: "page-title", children: "Buyers" }) }),
        /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsxs(Space, { size: "middle", children: [
          /* @__PURE__ */ jsx(Button, { style: { color: "blue", borderColor: "blue" }, shape: "circle", icon: /* @__PURE__ */ jsx(PlusOutlined, {}), size: "middle", onClick: handleAdd }),
          /* @__PURE__ */ jsx(Button, { style: { color: "green", borderColor: "green" }, size: "middle", onClick: handleImport, children: " Import Data" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "table-holder", children: /* @__PURE__ */ jsx(Table, { columns, dataSource: data, rowKey: (key) => key.id, loading, pagination: { defaultPageSize: 50 } }) })
    ] })
  ] });
};
Index.layout = (page) => /* @__PURE__ */ jsx(AgentLayout, { children: page });
export {
  Index as default
};

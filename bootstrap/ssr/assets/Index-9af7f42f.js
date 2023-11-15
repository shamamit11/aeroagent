import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { A as AgentLayout } from "./AgentLayout-55444b12.js";
import { usePage, Head, router, Link } from "@inertiajs/react";
import { Card, Row, Col, Button, Table, Space, Tooltip, Popconfirm, message, Input } from "antd";
import { PlusOutlined, OrderedListOutlined, FolderOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
/* empty css                *//* empty css                */const Index = () => {
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
    router.get("/project/addEdit");
  };
  const handleEdit = (id) => {
    router.get(`/project/addEdit?id=${id}`);
  };
  const handleDetail = (id) => {
    router.get(`/project/detail?pid=${id}`);
  };
  const handleDoc = (id) => {
    router.get(`/project/doc?pid=${id}`);
  };
  const handleDelete = (id) => {
    const formData = {
      id
    };
    router.post("/project/delete", formData, {
      onSuccess: () => {
        message.success("Data Deleted Successfully !");
      },
      onFinish: () => {
        router.get("/project");
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "auto",
      ...getColumnSearchProps("name"),
      render: (_, record) => /* @__PURE__ */ jsx(Link, { title: "View", href: "/project/view", method: "get", data: { id: record.id }, children: record.name })
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      width: "15%",
      ...getColumnSearchProps("location")
    },
    {
      title: "Developer",
      dataIndex: "developer",
      key: "developer",
      width: "15%",
      ...getColumnSearchProps("developer")
    },
    {
      title: "Commission (%)",
      dataIndex: "commission",
      key: "commission",
      width: "12%",
      ...getColumnSearchProps("commission")
    },
    {
      title: "Status",
      dataIndex: "project_status",
      key: "project_status",
      width: "10%",
      ...getColumnSearchProps("project_status")
    },
    {
      title: "",
      key: "action",
      width: "12%",
      render: (_, record) => /* @__PURE__ */ jsxs(Space, { size: "middle", children: [
        /* @__PURE__ */ jsx(Tooltip, { title: "Units", color: "blue", children: /* @__PURE__ */ jsx(Button, { style: { color: "blue", borderColor: "blue" }, size: "middle", shape: "circle", icon: /* @__PURE__ */ jsx(OrderedListOutlined, {}), onClick: () => handleDetail(record.id) }) }),
        /* @__PURE__ */ jsx(Tooltip, { title: "Documents", color: "green", children: /* @__PURE__ */ jsx(Button, { style: { color: "green", borderColor: "green" }, size: "middle", shape: "circle", icon: /* @__PURE__ */ jsx(FolderOutlined, {}), onClick: () => handleDoc(record.id) }) }),
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
    /* @__PURE__ */ jsx(Head, { title: "Projects" }),
    /* @__PURE__ */ jsxs(Row, { justify: "space-between", align: "middle", style: { marginBottom: 20, marginTop: 5 }, children: [
      /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx("h1", { className: "page-title", children: "Projects" }) }),
      /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx(Button, { style: { color: "blue", borderColor: "blue" }, shape: "circle", icon: /* @__PURE__ */ jsx(PlusOutlined, {}), size: "middle", onClick: handleAdd }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "table-holder", children: /* @__PURE__ */ jsx(Table, { columns, dataSource: data, rowKey: (key) => key.id, loading, pagination: { defaultPageSize: 50 } }) })
  ] });
};
Index.layout = (page) => /* @__PURE__ */ jsx(AgentLayout, { children: page });
export {
  Index as default
};

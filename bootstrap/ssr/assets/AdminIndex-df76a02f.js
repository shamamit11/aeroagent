import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { A as AgentLayout } from "./AgentLayout-7e278773.js";
import { usePage, Head, router } from "@inertiajs/react";
import { Row, Col, Button, Table, Space, Popconfirm, message, Input } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
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
    router.get("/location/addEdit");
  };
  const handleEdit = (id) => {
    router.get(`/location/addEdit/?id=${id}`);
  };
  const handleDelete = (id) => {
    const formData = {
      id
    };
    router.post("/location/delete", formData, {
      onSuccess: () => {
        message.success("Data Deleted Successfully !");
      },
      onFinish: () => {
        router.get("/location");
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
      ...getColumnSearchProps("name")
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      width: "15%",
      ...getColumnSearchProps("city")
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      width: "20%",
      ...getColumnSearchProps("country"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"]
    },
    {
      title: "Added By",
      dataIndex: "user_name",
      key: "user_name",
      width: "20%",
      ...getColumnSearchProps("user_name")
    },
    {
      title: "",
      key: "action",
      width: "12%",
      render: (_, record) => /* @__PURE__ */ jsxs(Space, { size: "middle", children: [
        /* @__PURE__ */ jsx(Button, { size: "middle", onClick: () => handleEdit(record.id), children: "Edit" }),
        /* @__PURE__ */ jsx(
          Popconfirm,
          {
            title: "Delete",
            description: "Are you sure to delete?",
            onConfirm: () => handleDelete(record.id),
            onCancel: handleCancel,
            okText: "Yes",
            cancelText: "No",
            children: /* @__PURE__ */ jsx(Button, { danger: true, size: "middle", children: "Delete" })
          }
        )
      ] })
    }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Locations" }),
    /* @__PURE__ */ jsxs(Row, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx("h1", { className: "page-title", children: "Locations" }) }),
      /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx(Button, { type: "primary", shape: "circle", icon: /* @__PURE__ */ jsx(PlusOutlined, {}), size: "large", onClick: handleAdd }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "table-holder", children: /* @__PURE__ */ jsx(Table, { columns, dataSource: data, rowKey: (key) => key.id, loading, pagination: { defaultPageSize: 50 } }) })
  ] });
};
Index.layout = (page) => /* @__PURE__ */ jsx(AgentLayout, { children: page });
export {
  Index as default
};

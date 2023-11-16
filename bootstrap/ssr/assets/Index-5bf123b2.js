import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { A as AgentLayout } from "./AgentLayout-7e278773.js";
import { usePage, Head } from "@inertiajs/react";
import { Card, Row, Col, Table, Modal, Space, Divider, Tooltip, Button, Input } from "antd";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
/* empty css                */import "./light-logo-3220573e.js";
const style = "";
const Index = () => {
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [data, setData] = useState();
  const [detail, setDetail] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  const handleDetail = (record) => {
    console.log(record);
    setDetail(record);
    setIsModalOpen(true);
  };
  const handleModalCancel = () => {
    setIsModalOpen(false);
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
      title: "Date",
      dataIndex: "updated_at",
      key: "updated_at",
      width: "18%",
      ...getColumnSearchProps("updated_at")
    },
    {
      title: "Event",
      dataIndex: "event",
      key: "event",
      width: "15%",
      ...getColumnSearchProps("event")
    },
    {
      title: "Properties",
      dataIndex: "properties",
      key: "properties",
      width: "auto"
    },
    {
      title: "",
      key: "action",
      width: "10%",
      align: "center",
      render: (_, record) => /* @__PURE__ */ jsx(Space, { size: "middle", children: /* @__PURE__ */ jsx(Tooltip, { title: "View Detail", color: "blue", children: /* @__PURE__ */ jsx(Button, { style: { color: "blue", borderColor: "blue" }, size: "middle", shape: "circle", icon: /* @__PURE__ */ jsx(EyeOutlined, {}), onClick: () => handleDetail(record) }) }) })
    }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Activity Logs" }),
    /* @__PURE__ */ jsxs(Card, { bordered: false, style: { width: "100%", borderRadius: 0, paddingBottom: 20 }, children: [
      /* @__PURE__ */ jsx(Row, { justify: "space-between", align: "middle", style: { marginBottom: 20, marginTop: 5 }, children: /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx("span", { className: "page-title", children: "Activity Logs" }) }) }),
      /* @__PURE__ */ jsx("div", { className: "table-holder", children: /* @__PURE__ */ jsx(Table, { columns, dataSource: data, rowKey: (key) => key.id, loading, pagination: { defaultPageSize: 50 } }) })
    ] }),
    /* @__PURE__ */ jsxs(Modal, { title: "View Detail", open: isModalOpen, onCancel: handleModalCancel, footer: null, width: 900, children: [
      /* @__PURE__ */ jsxs(Space, { size: "small", children: [
        /* @__PURE__ */ jsx("span", { style: { fontWeight: 600 }, children: "Created At:" }),
        /* @__PURE__ */ jsx("span", { children: detail.created_at })
      ] }),
      /* @__PURE__ */ jsx(Divider, {}),
      /* @__PURE__ */ jsxs(Space, { size: "small", children: [
        /* @__PURE__ */ jsx("span", { style: { fontWeight: 600 }, children: "Updated At:" }),
        /* @__PURE__ */ jsx("span", { children: detail.updated_at })
      ] }),
      /* @__PURE__ */ jsx(Divider, {}),
      /* @__PURE__ */ jsxs(Space, { size: "small", children: [
        /* @__PURE__ */ jsx("span", { style: { fontWeight: 600 }, children: "Event:" }),
        /* @__PURE__ */ jsx("span", { children: detail.event })
      ] }),
      /* @__PURE__ */ jsx(Divider, {}),
      /* @__PURE__ */ jsxs("pre", { children: [
        detail.all_properties,
        " "
      ] })
    ] })
  ] });
};
Index.layout = (page) => /* @__PURE__ */ jsx(AgentLayout, { children: page });
export {
  Index as default
};

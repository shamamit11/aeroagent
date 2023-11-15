import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { A as AgentLayout } from "./AgentLayout-55444b12.js";
import { usePage, Head, router } from "@inertiajs/react";
import { Card, Row, Col, Space, Button, Table, Tooltip, Input } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
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
    router.get("/seller/addEdit");
  };
  const handleImport = () => {
    router.get("/seller/import");
  };
  const handleView = (id) => {
    router.get(`/seller/list?lid=${id}`);
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
      title: "Location",
      dataIndex: "name",
      key: "name",
      width: "auto",
      ...getColumnSearchProps("name")
    },
    {
      title: "Total Sellers",
      key: "action",
      width: "13%",
      align: "center",
      render: (_, record) => /* @__PURE__ */ jsx(Space, { size: "middle", children: /* @__PURE__ */ jsx(Tooltip, { title: "Total Sellers", color: "orange", children: /* @__PURE__ */ jsx(Button, { type: "primary", size: "middle", shape: "circle", onClick: () => handleView(record.id), children: record.count }) }) })
    }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Sellers" }),
    /* @__PURE__ */ jsxs(Card, { bordered: false, style: { width: "100%", borderRadius: 0, paddingBottom: 20 }, children: [
      /* @__PURE__ */ jsxs(Row, { justify: "space-between", align: "middle", style: { marginBottom: 20, marginTop: 5 }, children: [
        /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx("span", { className: "page-title", children: "Sellers" }) }),
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

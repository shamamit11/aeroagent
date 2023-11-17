import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { A as AdminLayout } from "./AdminLayout-ed82414e.js";
import { usePage, Head } from "@inertiajs/react";
import { Row, Col, Table, Badge, Input, Space, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
/* empty css                *//* empty css                */import "./light-logo-3220573e.js";
const List = () => {
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
      title: "Payout Date",
      dataIndex: "payout_date",
      key: "payout_date",
      width: "15%"
    },
    {
      title: "Payout Range",
      key: "pay_range",
      width: "25%",
      render: (_, record) => /* @__PURE__ */ jsxs("span", { children: [
        record.payout_date_from,
        " - ",
        record.payout_date_to
      ] })
    },
    {
      title: "Amount (AED)",
      dataIndex: "amount",
      key: "amount",
      width: "18%"
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
      align: "center",
      ...getColumnSearchProps("status"),
      render: (_, record) => /* @__PURE__ */ jsx(Badge, { count: record.status, color: record.status_color })
    }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Payouts" }),
    /* @__PURE__ */ jsx(Row, { justify: "space-between", align: "middle", children: /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx("span", { className: "page-title", children: "List All Payouts" }) }) }),
    /* @__PURE__ */ jsx("div", { className: "table-holder", children: /* @__PURE__ */ jsx(Table, { columns, dataSource: data, rowKey: (key) => key.id, loading, pagination: { defaultPageSize: 200 } }) })
  ] });
};
List.layout = (page) => /* @__PURE__ */ jsx(AdminLayout, { children: page });
export {
  List as default
};

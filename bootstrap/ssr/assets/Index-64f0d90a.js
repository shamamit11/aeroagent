import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { A as AffiliateLayout } from "./AffiliateLayout-146f8779.js";
import { usePage, Head } from "@inertiajs/react";
import { Row, Col, Card, Statistic, Table, Input, Space, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
/* empty css                *//* empty css                */import "./light-logo-3220573e.js";
const Index = () => {
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [data, setData] = useState();
  const searchInput = useRef(null);
  const { results, balance, totalReferral, totalPayout, totalRenewal } = usePage().props;
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
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: "12%",
      ...getColumnSearchProps("date")
    },
    {
      title: "Transaction#",
      dataIndex: "transaction_id",
      key: "transaction_id",
      width: "15%",
      ...getColumnSearchProps("transaction_id")
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: "15%",
      ...getColumnSearchProps("type")
    },
    {
      title: "Amount (AED)",
      dataIndex: "amount",
      key: "amount",
      width: "15%"
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
      width: "auto"
    }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "My Wallet" }),
    /* @__PURE__ */ jsx(Row, { justify: "space-between", align: "middle", style: { marginBottom: 20 }, children: /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx("span", { className: "page-title", children: "My Wallet" }) }) }),
    /* @__PURE__ */ jsxs(Row, { gutter: 24, children: [
      /* @__PURE__ */ jsx(Col, { span: 6, children: /* @__PURE__ */ jsx(Card, { bordered: false, children: /* @__PURE__ */ jsx(
        Statistic,
        {
          title: "Available Balance (AED)",
          value: balance,
          precision: 2,
          valueStyle: {
            color: "#3f8600"
          }
        }
      ) }) }),
      /* @__PURE__ */ jsx(Col, { span: 6, children: /* @__PURE__ */ jsx(Card, { bordered: false, children: /* @__PURE__ */ jsx(
        Statistic,
        {
          title: "Total Referral (AED)",
          value: totalReferral,
          precision: 2,
          valueStyle: {
            color: "skyblue"
          }
        }
      ) }) }),
      /* @__PURE__ */ jsx(Col, { span: 6, children: /* @__PURE__ */ jsx(Card, { bordered: false, children: /* @__PURE__ */ jsx(
        Statistic,
        {
          title: "Total Payout (AED)",
          value: totalPayout,
          precision: 2,
          valueStyle: {
            color: "orange"
          }
        }
      ) }) }),
      /* @__PURE__ */ jsx(Col, { span: 6, children: /* @__PURE__ */ jsx(Card, { bordered: false, children: /* @__PURE__ */ jsx(
        Statistic,
        {
          title: "Total Renewal (AED)",
          value: totalRenewal,
          precision: 2,
          valueStyle: {
            color: "#cf1322"
          }
        }
      ) }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "table-holder", children: /* @__PURE__ */ jsx(Table, { columns, dataSource: data, rowKey: (key) => key.id, loading, pagination: { defaultPageSize: 50 } }) })
  ] });
};
Index.layout = (page) => /* @__PURE__ */ jsx(AffiliateLayout, { children: page });
export {
  Index as default
};

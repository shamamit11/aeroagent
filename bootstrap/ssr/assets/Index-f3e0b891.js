import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import dayjs from "dayjs";
import { A as AdminLayout } from "./AdminLayout-bd2f9456.js";
import { usePage, Head, router } from "@inertiajs/react";
import { Row, Col, Space, DatePicker, Table, Badge, Tooltip, Button, Input } from "antd";
import { CheckOutlined, SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
/* empty css                */import "./light-logo-3220573e.js";
/* empty css                */const Index = () => {
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [data, setData] = useState();
  const { results, paydate } = usePage().props;
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
  const onDateChange = (date, dateString) => {
    router.get(`/admin/payout?pay_date=${dateString}`);
  };
  const handlePayment = (object) => {
    console.log(object);
    router.post("/admin/payout/store", object, {
      onSuccess: () => {
        message.success("Payout Created Successfully !");
      },
      onError: () => {
        message.error("There was an error processing your request. Please try again !");
      },
      onFinish: () => {
        router.get("/admin/payout");
      }
    });
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
      width: "",
      ...getColumnSearchProps("name")
    },
    {
      title: "IBAN",
      dataIndex: "iban",
      key: "iban",
      width: "20%"
    },
    {
      title: "Payout Range",
      key: "pay_range",
      width: "20%",
      render: (_, record) => /* @__PURE__ */ jsxs("span", { children: [
        record.pay_date_from,
        " - ",
        record.pay_date_to
      ] })
    },
    {
      title: "Wallet Balance (AED)",
      dataIndex: "wallet_balance",
      key: "wallet_balance",
      width: "20%"
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
      align: "center",
      ...getColumnSearchProps("status"),
      render: (_, record) => /* @__PURE__ */ jsx(Badge, { count: record.status, color: record.status_color })
    },
    {
      title: "",
      key: "action",
      width: "8%",
      align: "center",
      render: (_, record) => /* @__PURE__ */ jsxs(Fragment, { children: [
        record.status == "Not Paid" && /* @__PURE__ */ jsx(Space, { size: "middle", children: /* @__PURE__ */ jsx(Tooltip, { title: "Mark as Paid", color: "green", children: /* @__PURE__ */ jsx(Button, { type: "primary", size: "small", shape: "circle", icon: /* @__PURE__ */ jsx(CheckOutlined, {}), onClick: () => handlePayment(record) }) }) }),
        record.status == "Paid" && /* @__PURE__ */ jsx(Space, { size: "middle", children: /* @__PURE__ */ jsx(Tooltip, { title: "Mark as Paid", color: "red", children: /* @__PURE__ */ jsx(Button, { size: "small", shape: "circle", icon: /* @__PURE__ */ jsx(CheckOutlined, {}), disabled: true }) }) })
      ] })
    }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Payouts" }),
    /* @__PURE__ */ jsxs(Row, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsxs("span", { className: "page-title", children: [
        "Payouts for ",
        paydate
      ] }) }),
      /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsxs(Space, { size: "middle", children: [
        /* @__PURE__ */ jsx("span", { children: "Select Date:" }),
        /* @__PURE__ */ jsx(DatePicker, { defaultValue: dayjs(paydate), onChange: onDateChange })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "table-holder", children: /* @__PURE__ */ jsx(Table, { columns, dataSource: data, rowKey: (key) => key.id, loading, pagination: { defaultPageSize: 200 } }) })
  ] });
};
Index.layout = (page) => /* @__PURE__ */ jsx(AdminLayout, { children: page });
export {
  Index as default
};

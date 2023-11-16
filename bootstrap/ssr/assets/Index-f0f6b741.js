import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { A as AgentLayout } from "./AgentLayout-7e278773.js";
import { usePage, useForm, Head, router } from "@inertiajs/react";
import { Card, Row, Col, Table, Modal, Form, Select, Space, Button, message, Badge, Tooltip, Popconfirm, Input } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
/* empty css                */import "./light-logo-3220573e.js";
const style = "";
const Index = () => {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [rowdata, setRowData] = useState();
  const props = usePage().props;
  const results = props.results;
  const statuses = props.statuses;
  useEffect(() => {
    setRowData(results);
    setLoading(false);
  }, []);
  const { data, setData, post, processing, errors } = useForm({
    id: null,
    status_id: null
  });
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const handleModalCancel = () => {
    setIsModalOpen(false);
  };
  const handleModalOpen = (row_id) => {
    setData({ id: row_id });
    setIsModalOpen(true);
  };
  const handleDetail = (customer_type, source_id) => {
    if (customer_type == "Seller") {
      router.get(`/seller/detail?id=${source_id}`);
    }
    if (customer_type == "Buyer") {
      router.get(`/buyer/detail?id=${source_id}`);
    }
    if (customer_type == "Leaser") {
      router.get(`/leaser/detail?id=${source_id}`);
    }
    if (customer_type == "Tenant") {
      router.get(`/tenant/detail?id=${source_id}`);
    }
  };
  const handleDelete = (id) => {
    const formData = {
      id
    };
    router.post("/meeting/delete", formData, {
      onSuccess: () => {
        message.success("Data Deleted Successfully !");
      },
      onFinish: () => {
        router.get(`/meeting`);
      }
    });
  };
  const handleCancel = () => {
    message.error("Operation Cancelled !");
  };
  const submit = () => {
    post("/meeting/updateStatus", {
      onSuccess: () => {
        message.success("Status Updated Successfully !");
      },
      onError: () => {
        message.error("There was an error processing your request. Please try again !");
        router.get(`/meeting`);
      },
      onFinish: () => {
        router.get(`/meeting`);
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
      title: "Customer Name",
      dataIndex: "customer_name",
      key: "customer_name",
      width: "18%",
      ...getColumnSearchProps("customer_name")
    },
    {
      title: "Meeting Date",
      dataIndex: "date",
      key: "date",
      width: "15%",
      ...getColumnSearchProps("date")
    },
    {
      title: "Meeting Time",
      dataIndex: "time",
      key: "time",
      width: "15%",
      ...getColumnSearchProps("time")
    },
    {
      title: "List Type",
      dataIndex: "customer_type",
      key: "customer_type",
      width: "13%",
      ...getColumnSearchProps("customer_type")
    },
    {
      title: "Status",
      key: "status",
      width: "12%",
      align: "center",
      ...getColumnSearchProps("status"),
      render: (_, record) => /* @__PURE__ */ jsxs(Fragment, { children: [
        record.status_color && /* @__PURE__ */ jsx(Badge, { color: record.status_color, count: record.status }),
        !record.status_color && /* @__PURE__ */ jsx("span", { children: record.status })
      ] })
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
      width: "auto"
    },
    {
      title: "",
      key: "action",
      width: "10%",
      align: "center",
      render: (_, record) => /* @__PURE__ */ jsxs(Space, { size: "middle", children: [
        /* @__PURE__ */ jsx(Tooltip, { title: "View Detail", color: "blue", children: /* @__PURE__ */ jsx(Button, { style: { color: "blue", borderColor: "blue" }, size: "middle", shape: "circle", icon: /* @__PURE__ */ jsx(EyeOutlined, {}), onClick: () => handleDetail(record.customer_type, record.source_id) }) }),
        !record.status_id && /* @__PURE__ */ jsx(Tooltip, { title: "Update Status", color: "orange", children: /* @__PURE__ */ jsx(Button, { style: { color: "orange", borderColor: "orange" }, size: "middle", shape: "circle", icon: /* @__PURE__ */ jsx(EditOutlined, {}), onClick: () => handleModalOpen(record.id) }) }),
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
    /* @__PURE__ */ jsx(Head, { title: "Meetings" }),
    /* @__PURE__ */ jsxs(Card, { bordered: false, style: { width: "100%", borderRadius: 0, paddingBottom: 20 }, children: [
      /* @__PURE__ */ jsx(Row, { justify: "space-between", align: "middle", style: { marginBottom: 20, marginTop: 5 }, children: /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx("span", { className: "page-title", children: "Meetings" }) }) }),
      /* @__PURE__ */ jsx("div", { className: "table-holder", children: /* @__PURE__ */ jsx(Table, { columns, dataSource: rowdata, rowKey: (key) => key.id, loading, pagination: { defaultPageSize: 50 } }) })
    ] }),
    /* @__PURE__ */ jsx(Modal, { title: "Update Status", open: isModalOpen, onCancel: handleModalCancel, footer: null, children: /* @__PURE__ */ jsx("div", { className: "form-holder", style: { width: "100%" }, children: /* @__PURE__ */ jsxs(
      Form,
      {
        name: "basic",
        layout: "vertical",
        initialValues: data,
        onFieldsChange: (changedFields) => {
          changedFields.forEach((item) => {
            setData(item.name[0], item.value);
          });
        },
        onFinish: submit,
        autoComplete: "off",
        encType: "multipart/form-data",
        style: { maxWidth: "100%" },
        children: [
          /* @__PURE__ */ jsx(
            Form.Item,
            {
              label: "Status",
              name: "status_id",
              validateStatus: errors.status_id && "error",
              help: errors.status_id,
              rules: [
                {
                  required: true,
                  message: "This field is required"
                }
              ],
              children: /* @__PURE__ */ jsx(
                Select,
                {
                  placeholder: "Select",
                  options: statuses.map((item) => ({
                    label: item.name,
                    value: item.id
                  }))
                }
              )
            }
          ),
          /* @__PURE__ */ jsx(Form.Item, { className: "form-actions", children: /* @__PURE__ */ jsx(Space, { size: "middle", children: /* @__PURE__ */ jsx(Button, { type: "primary", htmlType: "submit", loading: processing, size: "large", children: processing ? "Please Wait" : "Submit" }) }) })
        ]
      }
    ) }) })
  ] });
};
Index.layout = (page) => /* @__PURE__ */ jsx(AgentLayout, { children: page });
export {
  Index as default
};

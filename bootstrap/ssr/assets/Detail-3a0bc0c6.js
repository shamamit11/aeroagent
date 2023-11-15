import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { A as AgentLayout } from "./AgentLayout-55444b12.js";
import { usePage, useForm, Head, router } from "@inertiajs/react";
import { Form, Card, Row, Col, Space, Badge, Button, Divider, Dropdown, List, Modal, Select, Input, message } from "antd";
import { ArrowLeftOutlined, DownOutlined } from "@ant-design/icons";
/* empty css                *//* empty css                */const { TextArea } = Input;
const Detail = () => {
  var _a, _b, _c;
  const props = usePage().props;
  const rowData = props.row;
  console.log(rowData);
  const activities = props.activities;
  const activityTypes = props.activityTypes;
  const statuses = props.statuses;
  const [title, setTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hideDateField, setHideDateField] = useState(true);
  const [requiredField, setRequiredField] = useState(false);
  const items = statuses;
  const onMenuClick = (e) => {
    if (e.key == 2 || e.key == 3) {
      router.get(`/tenant/editData?id=${rowData.id}&status=${e.key}`);
    } else {
      const formData = {
        source_id: rowData.id,
        customer_type: "tenant",
        customer_id: rowData.customer_id,
        status: "No Deal"
      };
      router.post("/tenant/updateStatus", formData, {
        onSuccess: () => {
          message.success("Status Updated Successfully !");
        },
        onError: () => {
          message.error("There was an error processing your request. Please try again !");
          router.get(`/tenant/detail?id=${rowData.id}`);
        },
        onFinish: () => {
          router.get(`/tenant/detail?id=${rowData.id}`);
        }
      });
    }
  };
  useEffect(() => {
    setTitle(props.title);
  }, []);
  const handleBack = () => {
    router.get(`/tenant`);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const updateActivityType = (value) => {
    if (value == 1) {
      setHideDateField(true);
    } else {
      setHideDateField(false);
      setRequiredField(true);
    }
  };
  const [form] = Form.useForm();
  const { data, setData, post, processing, errors } = useForm({
    source_id: rowData.id,
    customer_type: "tenant",
    customer_id: rowData.customer_id,
    activity_type: null,
    date: null,
    time: null,
    note: null
  });
  const submit = () => {
    post("/tenant/activityAction", {
      onSuccess: () => {
        message.success("Activity Added Successfully !");
      },
      onError: () => {
        message.error("There was an error processing your request. Please try again !");
        router.get(`/tenant/detail?id=${rowData.id}`);
      },
      onFinish: () => {
        router.get(`/tenant/detail?id=${rowData.id}`);
      }
    });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Card, { bordered: false, style: { width: "100%", borderRadius: 0, paddingBottom: 20 }, children: [
      /* @__PURE__ */ jsx(Head, { title }),
      /* @__PURE__ */ jsxs(Row, { justify: "space-between", align: "middle", style: { marginBottom: 20, marginTop: 5 }, children: [
        /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsxs(Space, { size: "small", children: [
          /* @__PURE__ */ jsx("span", { className: "page-title", children: rowData.customer.name }),
          /* @__PURE__ */ jsx(Badge, { color: rowData.status_color, count: rowData.status })
        ] }) }),
        /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx(Space, { size: "middle", children: /* @__PURE__ */ jsx(Button, { type: "primary", shape: "circle", icon: /* @__PURE__ */ jsx(ArrowLeftOutlined, {}), size: "middle", onClick: handleBack }) }) })
      ] }),
      /* @__PURE__ */ jsxs(Row, { justify: "space-between", align: "top", style: { marginBottom: 20, marginTop: 5, width: "100%" }, children: [
        /* @__PURE__ */ jsxs(Col, { style: { width: "28%" }, children: [
          /* @__PURE__ */ jsxs(Card, { title: "Customer Information", headStyle: { backgroundColor: "skyblue", color: "white" }, style: { borderColor: "skyblue", marginBottom: 25 }, children: [
            /* @__PURE__ */ jsxs(Space, { size: "small", children: [
              /* @__PURE__ */ jsx("span", { style: { fontWeight: 600 }, children: "Mobile:" }),
              /* @__PURE__ */ jsx("span", { children: rowData.customer.mobile })
            ] }),
            /* @__PURE__ */ jsx(Divider, {}),
            /* @__PURE__ */ jsxs(Space, { size: "small", children: [
              /* @__PURE__ */ jsx("span", { style: { fontWeight: 600 }, children: "Email:" }),
              /* @__PURE__ */ jsx("span", { children: rowData.customer.email })
            ] }),
            /* @__PURE__ */ jsx(Divider, {}),
            /* @__PURE__ */ jsxs(Space, { size: "small", children: [
              /* @__PURE__ */ jsx("span", { style: { fontWeight: 600 }, children: "Nationality:" }),
              /* @__PURE__ */ jsx("span", { children: rowData.customer.nationality })
            ] })
          ] }),
          /* @__PURE__ */ jsxs(Card, { title: "Quick Information", headStyle: { backgroundColor: "skyblue", color: "white" }, style: { borderColor: "skyblue" }, children: [
            /* @__PURE__ */ jsxs(Space, { size: "small", children: [
              /* @__PURE__ */ jsx("span", { style: { fontWeight: 600 }, children: "Property:" }),
              /* @__PURE__ */ jsx("span", { children: rowData.property.name })
            ] }),
            ((_a = rowData == null ? void 0 : rowData.property_type) == null ? void 0 : _a.name) && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Divider, {}),
              /* @__PURE__ */ jsxs(Space, { size: "small", children: [
                /* @__PURE__ */ jsx("span", { style: { fontWeight: 600 }, children: "Property Type:" }),
                /* @__PURE__ */ jsx("span", { children: (_b = rowData == null ? void 0 : rowData.property_type) == null ? void 0 : _b.name })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Col, { style: { width: "70%" }, children: [
          /* @__PURE__ */ jsx(Card, { style: { marginBottom: 20 }, children: /* @__PURE__ */ jsxs(Row, { justify: "space-between", align: "middle", children: [
            /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx(Button, { size: "large", onClick: showModal, children: "Add Activity" }) }),
            /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx(
              Dropdown,
              {
                menu: {
                  items,
                  onClick: onMenuClick
                },
                children: /* @__PURE__ */ jsx(Button, { size: "large", style: { borderColor: "red" }, children: /* @__PURE__ */ jsxs(Space, { children: [
                  /* @__PURE__ */ jsx("span", { style: { color: "red" }, children: "Update Status" }),
                  /* @__PURE__ */ jsx(DownOutlined, { style: { color: "red" } })
                ] }) })
              }
            ) })
          ] }) }),
          rowData.status == "Deal" && /* @__PURE__ */ jsxs(Card, { title: "Property Information", headStyle: { backgroundColor: "skyblue", color: "white" }, style: { borderColor: "skyblue", marginBottom: 20 }, children: [
            /* @__PURE__ */ jsxs(Row, { justify: "space-between", align: "top", children: [
              /* @__PURE__ */ jsxs(Col, { style: { width: "32%" }, children: [
                /* @__PURE__ */ jsxs(Space, { size: "small", children: [
                  /* @__PURE__ */ jsx("span", { style: { fontWeight: 600 }, children: "Property:" }),
                  /* @__PURE__ */ jsx("span", { children: rowData == null ? void 0 : rowData.property.name })
                ] }),
                /* @__PURE__ */ jsx(Divider, {}),
                /* @__PURE__ */ jsxs(Space, { size: "small", children: [
                  /* @__PURE__ */ jsx("span", { style: { fontWeight: 600 }, children: "Budget:" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    "AED ",
                    rowData == null ? void 0 : rowData.budget
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs(Col, { style: { width: "32%" }, children: [
                /* @__PURE__ */ jsxs(Space, { size: "small", children: [
                  /* @__PURE__ */ jsx("span", { style: { fontWeight: 600 }, children: "Property Type:" }),
                  /* @__PURE__ */ jsx("span", { children: (_c = rowData == null ? void 0 : rowData.property_type) == null ? void 0 : _c.name })
                ] }),
                /* @__PURE__ */ jsx(Divider, {}),
                /* @__PURE__ */ jsxs(Space, { size: "small", children: [
                  /* @__PURE__ */ jsx("span", { style: { fontWeight: 600 }, children: "Time to Close:" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    rowData == null ? void 0 : rowData.time_to_close,
                    " Days"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs(Col, { style: { width: "32%" }, children: [
                /* @__PURE__ */ jsxs(Space, { size: "small", children: [
                  /* @__PURE__ */ jsx("span", { style: { fontWeight: 600 }, children: "Property Size:" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    rowData == null ? void 0 : rowData.property_size,
                    " Sq. ft"
                  ] })
                ] }),
                /* @__PURE__ */ jsx(Divider, {})
              ] })
            ] }),
            /* @__PURE__ */ jsx(Divider, {}),
            /* @__PURE__ */ jsxs(Space, { size: "small", children: [
              /* @__PURE__ */ jsx("span", { style: { fontWeight: 600 }, children: "Amenities:" }),
              /* @__PURE__ */ jsx("span", { children: rowData == null ? void 0 : rowData.amenities })
            ] }),
            /* @__PURE__ */ jsx(Divider, {}),
            /* @__PURE__ */ jsxs(Space, { size: "small", children: [
              /* @__PURE__ */ jsx("span", { style: { fontWeight: 600 }, children: "Note:" }),
              /* @__PURE__ */ jsx("span", { children: rowData == null ? void 0 : rowData.note })
            ] })
          ] }),
          /* @__PURE__ */ jsx(Card, { title: "Recent Activities", headStyle: { backgroundColor: "lightwhite", color: "gray" }, style: { borderColor: "lightwhite" }, children: /* @__PURE__ */ jsx(
            List,
            {
              itemLayout: "horizontal",
              dataSource: activities,
              renderItem: (item, index) => /* @__PURE__ */ jsx(List.Item, { children: /* @__PURE__ */ jsx(
                List.Item.Meta,
                {
                  title: item.note,
                  description: item.time_elapsed
                }
              ) }, item.id)
            }
          ) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Modal, { title: "Add Activity", open: isModalOpen, onOk: handleOk, onCancel: handleCancel, footer: null, children: /* @__PURE__ */ jsx("div", { className: "form-holder", style: { width: "100%" }, children: /* @__PURE__ */ jsxs(
      Form,
      {
        form,
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
              label: "Activity Type",
              name: "activity_type",
              validateStatus: errors.activity_type && "error",
              help: errors.activity_type,
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
                  onChange: (value) => {
                    updateActivityType(value);
                  },
                  options: activityTypes.map((item) => ({
                    label: item.name,
                    value: item.id,
                    disabled: item.disabled
                  }))
                }
              )
            }
          ),
          !hideDateField && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              Form.Item,
              {
                label: "Date",
                name: "date",
                validateStatus: errors.date && "error",
                help: errors.date,
                rules: [
                  {
                    required: requiredField,
                    message: "This field is required"
                  }
                ],
                children: /* @__PURE__ */ jsx(Input, { type: "date" })
              }
            ),
            /* @__PURE__ */ jsx(
              Form.Item,
              {
                label: "Time",
                name: "time",
                validateStatus: errors.time && "error",
                help: errors.time,
                rules: [
                  {
                    required: requiredField,
                    message: "This field is required"
                  }
                ],
                children: /* @__PURE__ */ jsx(Input, { type: "time" })
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            Form.Item,
            {
              label: "Note",
              name: "note",
              validateStatus: errors.note && "error",
              help: errors.note,
              rules: [
                {
                  required: true,
                  message: "This field is required"
                }
              ],
              children: /* @__PURE__ */ jsx(TextArea, { rows: 4 })
            }
          ),
          /* @__PURE__ */ jsx(Form.Item, { className: "form-actions", children: /* @__PURE__ */ jsx(Space, { size: "middle", children: /* @__PURE__ */ jsx(Button, { type: "primary", htmlType: "submit", loading: processing, size: "large", children: processing ? "Please Wait" : "Submit" }) }) })
        ]
      }
    ) }) })
  ] });
};
Detail.layout = (page) => /* @__PURE__ */ jsx(AgentLayout, { children: page });
export {
  Detail as default
};

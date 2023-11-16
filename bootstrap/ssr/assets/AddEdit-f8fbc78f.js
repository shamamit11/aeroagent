import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { A as AgentLayout } from "./AgentLayout-7e278773.js";
import { usePage, useForm, Head, router } from "@inertiajs/react";
import { Card, Row, Col, Form, Input, Select, DatePicker, Space, Button, message } from "antd";
import dayjs from "dayjs";
/* empty css                */import "@ant-design/icons";
/* empty css                */import "./light-logo-3220573e.js";
const AddEdit = () => {
  const props = usePage().props;
  const rowData = props.row;
  const developers = props.developers;
  const locations = props.locations;
  const amenities = props.amenities;
  const [title, setTitle] = useState("");
  const dateFormat = "YYYY-MM-DD HH:mm:ss";
  const amenities_id = rowData == null ? void 0 : rowData.amenities_id;
  const amenitiesArray = amenities_id == null ? void 0 : amenities_id.split(",").map(Number);
  const { data, setData, post, processing, errors } = useForm({
    id: (rowData == null ? void 0 : rowData.id) ? rowData == null ? void 0 : rowData.id : 0,
    name: rowData == null ? void 0 : rowData.name,
    developer_id: rowData == null ? void 0 : rowData.developer_id,
    location_id: rowData == null ? void 0 : rowData.location_id,
    handover_date: (rowData == null ? void 0 : rowData.handover_date) ? dayjs(rowData == null ? void 0 : rowData.handover_date, dateFormat) : dayjs(),
    commission: rowData == null ? void 0 : rowData.commission,
    view_style: rowData == null ? void 0 : rowData.view_style,
    amenities_id: amenitiesArray,
    project_status: rowData == null ? void 0 : rowData.project_status
  });
  useEffect(() => {
    setTitle(props.title);
  }, []);
  const submit = () => {
    post("/project/addAction", {
      onSuccess: () => {
        if (data.id == 0) {
          message.success("Data Added Successfully !");
        } else {
          message.success("Data Updated Successfully !");
        }
      },
      onError: () => {
        message.error("There was an error processing your request. Please try again !");
      },
      onFinish: () => {
        router.get("/project");
      }
    });
  };
  const handleCancel = () => {
    router.get("/project");
  };
  return /* @__PURE__ */ jsxs(Card, { bordered: false, style: { width: "100%", borderRadius: 0, paddingBottom: 20 }, children: [
    /* @__PURE__ */ jsx(Head, { title }),
    /* @__PURE__ */ jsx(Row, { justify: "space-between", align: "middle", style: { marginBottom: 20, marginTop: 5 }, children: /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx("span", { className: "page-title", children: title }) }) }),
    /* @__PURE__ */ jsx("div", { className: "form-holder", children: /* @__PURE__ */ jsxs(
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
        children: [
          /* @__PURE__ */ jsx(
            Form.Item,
            {
              label: "Name",
              name: "name",
              validateStatus: errors.name && "error",
              help: errors.name,
              rules: [
                {
                  required: true,
                  message: "This field is required"
                }
              ],
              children: /* @__PURE__ */ jsx(
                Input,
                {
                  disabled: processing
                }
              )
            }
          ),
          /* @__PURE__ */ jsxs(Row, { justify: "space-between", align: "middle", children: [
            /* @__PURE__ */ jsx(Col, { style: { width: "48%" }, children: /* @__PURE__ */ jsx(
              Form.Item,
              {
                label: "Developer",
                name: "developer_id",
                validateStatus: errors.developer_id && "error",
                help: errors.developer_id,
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
                    options: developers.map((item) => ({
                      label: item.name,
                      value: item.id
                    }))
                  }
                )
              }
            ) }),
            /* @__PURE__ */ jsx(Col, { style: { width: "48%" }, children: /* @__PURE__ */ jsx(
              Form.Item,
              {
                label: "Location",
                name: "location_id",
                validateStatus: errors.location_id && "error",
                help: errors.location_id,
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
                    options: locations.map((item) => ({
                      label: item.name,
                      value: item.id
                    }))
                  }
                )
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxs(Row, { justify: "space-between", align: "middle", children: [
            /* @__PURE__ */ jsx(Col, { style: { width: "48%" }, children: /* @__PURE__ */ jsx(
              Form.Item,
              {
                label: "Handover Date",
                name: "handover_date",
                validateStatus: errors.handover_date && "error",
                help: errors.handover_date,
                rules: [
                  {
                    required: true,
                    message: "This field is required"
                  }
                ],
                children: /* @__PURE__ */ jsx(DatePicker, { showTime: true, format: dateFormat })
              }
            ) }),
            /* @__PURE__ */ jsx(Col, { style: { width: "48%" }, children: /* @__PURE__ */ jsx(
              Form.Item,
              {
                label: "Commission (%)",
                name: "commission",
                validateStatus: errors.commission && "error",
                help: errors.commission,
                rules: [
                  {
                    required: true,
                    message: "This field is required"
                  }
                ],
                children: /* @__PURE__ */ jsx(
                  Input,
                  {
                    disabled: processing
                  }
                )
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxs(Row, { justify: "space-between", align: "middle", children: [
            /* @__PURE__ */ jsx(Col, { style: { width: "48%" }, children: /* @__PURE__ */ jsx(
              Form.Item,
              {
                label: "View Style",
                name: "view_style",
                validateStatus: errors.view_style && "error",
                help: errors.view_style,
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
                    options: [
                      {
                        value: "normal_view",
                        label: "Normal View"
                      },
                      {
                        value: "sea_view",
                        label: "Sea View"
                      },
                      {
                        value: "mountain_view",
                        label: "Mountain View"
                      },
                      {
                        value: "open_view",
                        label: "Open View"
                      },
                      {
                        value: "street_view",
                        label: "Street View"
                      },
                      {
                        value: "pool_view",
                        label: "Pool View"
                      }
                    ]
                  }
                )
              }
            ) }),
            /* @__PURE__ */ jsx(Col, { style: { width: "48%" }, children: /* @__PURE__ */ jsx(
              Form.Item,
              {
                label: "Project Status",
                name: "project_status",
                validateStatus: errors.project_status && "error",
                help: errors.project_status,
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
                    options: [
                      {
                        value: "completed",
                        label: "Completed"
                      },
                      {
                        value: "under_construction",
                        label: "Under Construction"
                      }
                    ]
                  }
                )
              }
            ) })
          ] }),
          /* @__PURE__ */ jsx(
            Form.Item,
            {
              label: "Amenities",
              name: "amenities_id",
              validateStatus: errors.amenities_id && "error",
              help: errors.amenities_id,
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
                  mode: "multiple",
                  allowClear: true,
                  options: amenities.map((item) => ({
                    label: item.name,
                    value: item.id
                  }))
                }
              )
            }
          ),
          /* @__PURE__ */ jsx(Form.Item, { className: "form-actions", children: /* @__PURE__ */ jsxs(Space, { size: "middle", children: [
            /* @__PURE__ */ jsx(Button, { type: "primary", htmlType: "submit", loading: processing, size: "large", children: processing ? "Please Wait" : "Submit" }),
            /* @__PURE__ */ jsx(Button, { danger: true, size: "large", onClick: handleCancel, children: "Cancel" })
          ] }) })
        ]
      }
    ) })
  ] });
};
AddEdit.layout = (page) => /* @__PURE__ */ jsx(AgentLayout, { children: page });
export {
  AddEdit as default
};

import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { A as AgentLayout } from "./AgentLayout-55444b12.js";
import { usePage, useForm, Head, router } from "@inertiajs/react";
import { Form, Card, Row, Col, Select, Input, Space, Button, message } from "antd";
/* empty css                */import "@ant-design/icons";
/* empty css                */const AddEdit = () => {
  const props = usePage().props;
  const rowData = props.row;
  const pid = props.pid;
  const properties = props.properties;
  const propertyTypes = props.propertyTypes;
  const [title, setTitle] = useState("");
  const [form] = Form.useForm();
  const [selectedProperty, setSelectedProperty] = useState(rowData == null ? void 0 : rowData.property_id);
  const [selectedPropertyType, setSelectedPropertyType] = useState(rowData == null ? void 0 : rowData.property_type_id);
  const [filteredPropertyTypes, setFilteredPropertyTypes] = useState([]);
  const { data, setData, post, processing, errors } = useForm({
    id: (rowData == null ? void 0 : rowData.id) ? rowData == null ? void 0 : rowData.id : 0,
    project_id: (rowData == null ? void 0 : rowData.project_id) ? rowData == null ? void 0 : rowData.project_id : pid,
    property_id: selectedProperty,
    property_type_id: selectedPropertyType,
    total_units: rowData == null ? void 0 : rowData.total_units,
    size_from: rowData == null ? void 0 : rowData.size_from,
    size_to: rowData == null ? void 0 : rowData.size_to,
    price_from: rowData == null ? void 0 : rowData.price_from,
    price_to: rowData == null ? void 0 : rowData.price_to
  });
  useEffect(() => {
    setTitle(props.title);
  }, []);
  useEffect(() => {
    const filteredPropertyTypes2 = propertyTypes.filter((c) => c.property_id === selectedProperty);
    setFilteredPropertyTypes(filteredPropertyTypes2);
  }, [selectedProperty]);
  const submit = () => {
    post("/project/detail/addAction", {
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
        router.get(`/project/detail?pid=${pid}`);
      }
    });
  };
  const handleCancel = () => {
    router.get(`/project/detail?pid=${pid}`);
  };
  return /* @__PURE__ */ jsxs(Card, { bordered: false, style: { width: "100%", borderRadius: 0, paddingBottom: 20 }, children: [
    /* @__PURE__ */ jsx(Head, { title }),
    /* @__PURE__ */ jsx(Row, { justify: "space-between", align: "middle", style: { marginBottom: 20, marginTop: 5 }, children: /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx("span", { className: "page-title", children: title }) }) }),
    /* @__PURE__ */ jsx("div", { className: "form-holder", children: /* @__PURE__ */ jsxs(
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
        children: [
          /* @__PURE__ */ jsx(
            Form.Item,
            {
              label: "Property",
              name: "property_id",
              validateStatus: errors.property_id && "error",
              help: errors.property_id,
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
                  onChange: (val) => {
                    setSelectedProperty(val);
                    form.setFieldValue("property_type_id", void 0);
                  },
                  options: properties.map((item) => ({
                    label: item.name,
                    value: item.id
                  }))
                }
              )
            }
          ),
          /* @__PURE__ */ jsx(
            Form.Item,
            {
              label: "Property Type",
              name: "property_type_id",
              validateStatus: errors.property_type_id && "error",
              help: errors.property_type_id,
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
                  value: selectedPropertyType,
                  onChange: (val) => {
                    setSelectedPropertyType(val);
                  },
                  options: filteredPropertyTypes.map((item) => ({
                    label: item.name,
                    value: item.id
                  }))
                }
              )
            }
          ),
          /* @__PURE__ */ jsx(
            Form.Item,
            {
              label: "Total Units",
              name: "total_units",
              validateStatus: errors.total_units && "error",
              help: errors.total_units,
              rules: [
                {
                  required: true,
                  message: "This field is required"
                }
              ],
              children: /* @__PURE__ */ jsx(
                Input,
                {
                  type: "number",
                  disabled: processing
                }
              )
            }
          ),
          /* @__PURE__ */ jsxs(Row, { justify: "space-between", align: "middle", children: [
            /* @__PURE__ */ jsx(Col, { style: { width: "48%" }, children: /* @__PURE__ */ jsx(
              Form.Item,
              {
                label: "Size From",
                name: "size_from",
                validateStatus: errors.size_from && "error",
                help: errors.size_from,
                rules: [
                  {
                    required: true,
                    message: "This field is required"
                  }
                ],
                children: /* @__PURE__ */ jsx(
                  Input,
                  {
                    type: "number",
                    disabled: processing
                  }
                )
              }
            ) }),
            /* @__PURE__ */ jsx(Col, { style: { width: "48%" }, children: /* @__PURE__ */ jsx(
              Form.Item,
              {
                label: "Size To",
                name: "size_to",
                validateStatus: errors.size_to && "error",
                help: errors.size_to,
                rules: [
                  {
                    required: true,
                    message: "This field is required"
                  }
                ],
                children: /* @__PURE__ */ jsx(
                  Input,
                  {
                    type: "number",
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
                label: "Price From",
                name: "price_from",
                validateStatus: errors.price_from && "error",
                help: errors.price_from,
                rules: [
                  {
                    required: true,
                    message: "This field is required"
                  }
                ],
                children: /* @__PURE__ */ jsx(
                  Input,
                  {
                    type: "number",
                    disabled: processing
                  }
                )
              }
            ) }),
            /* @__PURE__ */ jsx(Col, { style: { width: "48%" }, children: /* @__PURE__ */ jsx(
              Form.Item,
              {
                label: "Price To",
                name: "price_to",
                validateStatus: errors.price_to && "error",
                help: errors.price_to,
                rules: [
                  {
                    required: true,
                    message: "This field is required"
                  }
                ],
                children: /* @__PURE__ */ jsx(
                  Input,
                  {
                    type: "number",
                    disabled: processing
                  }
                )
              }
            ) })
          ] }),
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

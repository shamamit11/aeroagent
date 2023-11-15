import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { A as AgentLayout } from "./AgentLayout-55444b12.js";
import { usePage, useForm, Head, router } from "@inertiajs/react";
import { Form, Card, Row, Col, Select, Input, Space, Button, message } from "antd";
/* empty css                */import "@ant-design/icons";
/* empty css                */const { TextArea } = Input;
const AddEdit = () => {
  const props = usePage().props;
  const rowData = props.row;
  const [title, setTitle] = useState("");
  const [marketDisabled, setMarketDisabled] = useState(false);
  const [projectDisabled, setProjectDisabled] = useState(false);
  const properties = props.properties;
  const propertyTypes = props.propertyTypes;
  const customers = props.customers;
  const amenities = props.amenities;
  const projects = props.projects;
  const status_name = props.status ? props.status : null;
  const [form] = Form.useForm();
  const [selectedProperty, setSelectedProperty] = useState(rowData == null ? void 0 : rowData.property_id);
  const [selectedPropertyType, setSelectedPropertyType] = useState(rowData == null ? void 0 : rowData.property_type_id);
  const [filteredPropertyTypes, setFilteredPropertyTypes] = useState([]);
  const amenities_id = rowData == null ? void 0 : rowData.property_amenities;
  const amenitiesArray = amenities_id == null ? void 0 : amenities_id.split(",").map(Number);
  const { data, setData, post, processing, errors } = useForm({
    id: (rowData == null ? void 0 : rowData.id) ? rowData == null ? void 0 : rowData.id : 0,
    customer_id: rowData == null ? void 0 : rowData.customer_id,
    interest: rowData == null ? void 0 : rowData.interest,
    market: rowData == null ? void 0 : rowData.market,
    project_id: rowData == null ? void 0 : rowData.project_id,
    property_id: selectedProperty,
    property_type_id: selectedPropertyType,
    property_amenities: amenitiesArray,
    property_size: rowData == null ? void 0 : rowData.property_size,
    budget: rowData == null ? void 0 : rowData.budget,
    time_to_close: rowData == null ? void 0 : rowData.time_to_close,
    note: (rowData == null ? void 0 : rowData.note) ? rowData == null ? void 0 : rowData.note : "",
    status: status_name
  });
  useEffect(() => {
    setTitle(props.title);
    if ((rowData == null ? void 0 : rowData.property_id) == 1 || (rowData == null ? void 0 : rowData.property_id) == 2 || (rowData == null ? void 0 : rowData.property_id) == 3 || (rowData == null ? void 0 : rowData.property_id) == 4) {
      setMarketDisabled(false);
    } else {
      setMarketDisabled(true);
    }
    if ((rowData == null ? void 0 : rowData.market) == "offplan") {
      setProjectDisabled(false);
    } else {
      setProjectDisabled(true);
    }
  }, []);
  useEffect(() => {
    const filteredPropertyTypes2 = propertyTypes.filter((c) => c.property_id === selectedProperty);
    setFilteredPropertyTypes(filteredPropertyTypes2);
  }, [selectedProperty]);
  const submit = () => {
    post("/buyer/addAction", {
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
        router.get(`/buyer`);
      }
    });
  };
  const updateMarketSelect = (val) => {
    if (val == 1 || val == 2 || val == 3 || val == 4) {
      setMarketDisabled(false);
    } else {
      setMarketDisabled(true);
    }
  };
  const updateProjectSelect = (val) => {
    if (val == "offplan") {
      setProjectDisabled(false);
    } else {
      setProjectDisabled(true);
    }
  };
  const handleCancel = () => {
    router.get("/buyer");
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(Card, { bordered: false, style: { width: "100%", borderRadius: 0, paddingBottom: 20 }, children: [
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
          /* @__PURE__ */ jsx(Row, { justify: "space-between", align: "middle", children: /* @__PURE__ */ jsx(Col, { style: { width: "100%" }, children: /* @__PURE__ */ jsx(
            Form.Item,
            {
              label: "Customer",
              name: "customer_id",
              validateStatus: errors.customer_id && "error",
              help: errors.customer_id,
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
                  options: customers.map((item) => ({
                    value: item.id,
                    label: item.name
                  }))
                }
              )
            }
          ) }) }),
          /* @__PURE__ */ jsxs(Row, { justify: "space-between", align: "middle", children: [
            /* @__PURE__ */ jsx(Col, { style: { width: "32%" }, children: /* @__PURE__ */ jsx(
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
                      updateMarketSelect(val);
                      form.setFieldValue("property_type_id", void 0);
                      form.setFieldValue("market", void 0);
                      form.setFieldValue("project_id", void 0);
                    },
                    options: properties.map((item) => ({
                      label: item.name,
                      value: item.id
                    }))
                  }
                )
              }
            ) }),
            /* @__PURE__ */ jsx(Col, { style: { width: "32%" }, children: /* @__PURE__ */ jsx(
              Form.Item,
              {
                label: "Property Type",
                name: "property_type_id",
                validateStatus: errors.property_type_id && "error",
                help: errors.property_type_id,
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
            ) }),
            /* @__PURE__ */ jsx(Col, { style: { width: "32%" }, children: /* @__PURE__ */ jsx(
              Form.Item,
              {
                label: "Property Size",
                name: "property_size",
                validateStatus: errors.property_size && "error",
                help: errors.property_size,
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
            /* @__PURE__ */ jsx(Col, { style: { width: "32%" }, children: /* @__PURE__ */ jsx(
              Form.Item,
              {
                label: "Market",
                name: "market",
                validateStatus: errors.market && "error",
                help: errors.market,
                children: /* @__PURE__ */ jsx(
                  Select,
                  {
                    disabled: marketDisabled,
                    placeholder: "Select",
                    onChange: (val) => {
                      updateProjectSelect(val);
                      form.setFieldValue("project_id", void 0);
                    },
                    options: [
                      {
                        value: "n/a",
                        label: "N/A"
                      },
                      {
                        value: "offplan",
                        label: "Off-Plan"
                      },
                      {
                        value: "secondary",
                        label: "Secondary"
                      }
                    ]
                  }
                )
              }
            ) }),
            /* @__PURE__ */ jsx(Col, { style: { width: "32%" }, children: /* @__PURE__ */ jsx(
              Form.Item,
              {
                label: "Project",
                name: "project_id",
                validateStatus: errors.project_id && "error",
                help: errors.project_id,
                children: /* @__PURE__ */ jsx(
                  Select,
                  {
                    disabled: projectDisabled,
                    placeholder: "Select Project",
                    options: projects.map((item) => ({
                      label: item.name,
                      value: item.id
                    }))
                  }
                )
              }
            ) }),
            /* @__PURE__ */ jsx(Col, { style: { width: "32%" }, children: /* @__PURE__ */ jsx(
              Form.Item,
              {
                label: "Interest",
                name: "interest",
                validateStatus: errors.interest && "error",
                help: errors.interest,
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
                        value: "n/a",
                        label: "N/A"
                      },
                      {
                        value: "personal",
                        label: "Personal"
                      },
                      {
                        value: "investment",
                        label: "Investment"
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
              name: "property_amenities",
              validateStatus: errors.property_amenities && "error",
              help: errors.property_amenities,
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
          /* @__PURE__ */ jsxs(Row, { justify: "space-between", align: "middle", children: [
            /* @__PURE__ */ jsx(Col, { style: { width: "49%" }, children: /* @__PURE__ */ jsx(
              Form.Item,
              {
                label: "Budget",
                name: "budget",
                validateStatus: errors.budget && "error",
                help: errors.budget,
                children: /* @__PURE__ */ jsx(
                  Input,
                  {
                    type: "number",
                    disabled: processing
                  }
                )
              }
            ) }),
            /* @__PURE__ */ jsx(Col, { style: { width: "49%" }, children: /* @__PURE__ */ jsx(
              Form.Item,
              {
                label: "Time to Close (Days)",
                name: "time_to_close",
                validateStatus: errors.time_to_close && "error",
                help: errors.time_to_close,
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
          /* @__PURE__ */ jsx(
            Form.Item,
            {
              label: "Note",
              name: "note",
              validateStatus: errors.note && "error",
              help: errors.note,
              children: /* @__PURE__ */ jsx(TextArea, { rows: 4 })
            }
          ),
          /* @__PURE__ */ jsx(Form.Item, { className: "form-actions", children: /* @__PURE__ */ jsxs(Space, { size: "middle", children: [
            /* @__PURE__ */ jsx(Button, { type: "primary", htmlType: "submit", loading: processing, size: "large", children: processing ? "Please Wait" : "Submit" }),
            /* @__PURE__ */ jsx(Button, { danger: true, size: "large", onClick: handleCancel, children: "Cancel" })
          ] }) })
        ]
      }
    ) })
  ] }) });
};
AddEdit.layout = (page) => /* @__PURE__ */ jsx(AgentLayout, { children: page });
export {
  AddEdit as default
};

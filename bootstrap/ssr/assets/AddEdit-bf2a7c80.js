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
  const [locationId, setLocationId] = useState(rowData == null ? void 0 : rowData.location_id);
  const properties = props.properties;
  const propertyTypes = props.propertyTypes;
  const customers = props.customers;
  const locations = props.locations;
  const amenities = props.amenities;
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
    location_id: rowData == null ? void 0 : rowData.location_id,
    property_id: selectedProperty,
    property_type_id: selectedPropertyType,
    building_name: rowData == null ? void 0 : rowData.building_name,
    view_style: rowData == null ? void 0 : rowData.view_style,
    property_amenities: amenitiesArray,
    property_size: rowData == null ? void 0 : rowData.property_size,
    rent_price: rowData == null ? void 0 : rowData.rent_price,
    rent_index: rowData == null ? void 0 : rowData.rent_index,
    noc_status: rowData == null ? void 0 : rowData.noc_status,
    is_furnished: rowData == null ? void 0 : rowData.is_furnished,
    commission_type: rowData == null ? void 0 : rowData.commission_type,
    commission: rowData == null ? void 0 : rowData.commission,
    ad_link: (rowData == null ? void 0 : rowData.ad_link) ? rowData == null ? void 0 : rowData.ad_link : "",
    note: (rowData == null ? void 0 : rowData.note) ? rowData == null ? void 0 : rowData.note : "",
    status: status_name
  });
  useEffect(() => {
    setTitle(props.title);
  }, []);
  useEffect(() => {
    const filteredPropertyTypes2 = propertyTypes.filter((c) => c.property_id === selectedProperty);
    setFilteredPropertyTypes(filteredPropertyTypes2);
  }, [selectedProperty]);
  const submit = () => {
    setLocationId(data.location_id);
    console.log(data);
    post("/leaser/addAction", {
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
        router.get(`/leaser/list?lid=${data.location_id}`);
      }
    });
  };
  const handleCancel = () => {
    if (locationId) {
      router.get(`/leaser/list?lid=${locationId}`);
    } else {
      router.get("/leaser");
    }
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
                      form.setFieldValue("property_type_id", void 0);
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
            ) }),
            /* @__PURE__ */ jsx(Col, { style: { width: "32%" }, children: /* @__PURE__ */ jsx(
              Form.Item,
              {
                label: "Building Name",
                name: "building_name",
                validateStatus: errors.building_name && "error",
                help: errors.building_name,
                children: /* @__PURE__ */ jsx(
                  Input,
                  {
                    disabled: processing
                  }
                )
              }
            ) }),
            /* @__PURE__ */ jsx(Col, { style: { width: "32%" }, children: /* @__PURE__ */ jsx(
              Form.Item,
              {
                label: "View Style",
                name: "view_style",
                validateStatus: errors.view_style && "error",
                help: errors.view_style,
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
                label: "Rent Price",
                name: "rent_price",
                validateStatus: errors.rent_price && "error",
                help: errors.rent_price,
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
                label: "Rent Index",
                name: "rent_index",
                validateStatus: errors.rent_index && "error",
                help: errors.rent_index,
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
            /* @__PURE__ */ jsx(Col, { style: { width: "49%" }, children: /* @__PURE__ */ jsx(
              Form.Item,
              {
                label: "NOC Status",
                name: "noc_status",
                validateStatus: errors.noc_status && "error",
                help: errors.noc_status,
                children: /* @__PURE__ */ jsx(
                  Select,
                  {
                    placeholder: "Select",
                    options: [
                      {
                        value: 1,
                        label: "Yes"
                      },
                      {
                        value: 0,
                        label: "No"
                      }
                    ]
                  }
                )
              }
            ) }),
            /* @__PURE__ */ jsx(Col, { style: { width: "49%" }, children: /* @__PURE__ */ jsx(
              Form.Item,
              {
                label: "Is Furnished?",
                name: "is_furnished",
                validateStatus: errors.is_furnished && "error",
                help: errors.is_furnished,
                children: /* @__PURE__ */ jsx(
                  Select,
                  {
                    placeholder: "Select",
                    options: [
                      {
                        value: 1,
                        label: "Yes"
                      },
                      {
                        value: 0,
                        label: "No"
                      }
                    ]
                  }
                )
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxs(Row, { justify: "space-between", align: "middle", children: [
            /* @__PURE__ */ jsx(Col, { style: { width: "49%" }, children: /* @__PURE__ */ jsx(
              Form.Item,
              {
                label: "Commission Type",
                name: "commission_type",
                validateStatus: errors.commission_type && "error",
                help: errors.commission_type,
                children: /* @__PURE__ */ jsx(
                  Select,
                  {
                    placeholder: "Select",
                    options: [
                      {
                        value: "topup",
                        label: "Top-up"
                      },
                      {
                        value: "included",
                        label: "Included"
                      }
                    ]
                  }
                )
              }
            ) }),
            /* @__PURE__ */ jsx(Col, { style: { width: "49%" }, children: /* @__PURE__ */ jsx(
              Form.Item,
              {
                label: "Commission %",
                name: "commission",
                validateStatus: errors.commission && "error",
                help: errors.commission,
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
              label: "Ad Link / URL",
              name: "ad_link",
              validateStatus: errors.ad_link && "error",
              help: errors.ad_link,
              children: /* @__PURE__ */ jsx(Input, { disabled: processing })
            }
          ),
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

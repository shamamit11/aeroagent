import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { A as AdminLayout } from "./AdminLayout-bc873fc4.js";
import { usePage, useForm, Head, router } from "@inertiajs/react";
import { Row, Col, Form, Input, Select, Space, Button, message } from "antd";
/* empty css                */import "@ant-design/icons";
/* empty css                */const AddEdit = () => {
  const props = usePage().props;
  const rowData = props.row;
  const properties = props.properties;
  const [title, setTitle] = useState("");
  const { data, setData, post, processing, errors } = useForm({
    id: (rowData == null ? void 0 : rowData.id) ? rowData == null ? void 0 : rowData.id : 0,
    name: rowData == null ? void 0 : rowData.name,
    property_id: (rowData == null ? void 0 : rowData.property_id) ? rowData == null ? void 0 : rowData.property_id : 1
  });
  useEffect(() => {
    setTitle(props.title);
  }, []);
  const submit = () => {
    console.log(data);
    post("/admin/propertyType/addAction", {
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
        router.get("/admin/propertyType");
      }
    });
  };
  const handleCancel = () => {
    router.get("/admin/propertyType");
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title }),
    /* @__PURE__ */ jsx(Row, { justify: "space-between", align: "middle", children: /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx("h1", { className: "page-title", children: title }) }) }),
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
                  options: properties.map((item) => ({
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
AddEdit.layout = (page) => /* @__PURE__ */ jsx(AdminLayout, { children: page });
export {
  AddEdit as default
};

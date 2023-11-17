import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { A as AdminLayout } from "./AdminLayout-2b572b0f.js";
import { usePage, useForm, Head, router } from "@inertiajs/react";
import { Row, Col, Form, Input, Select, Space, Button, message } from "antd";
/* empty css                */import "@ant-design/icons";
import "./light-logo-3220573e.js";
/* empty css                */const AddEdit = () => {
  const props = usePage().props;
  const rowData = props.row;
  const [title, setTitle] = useState("");
  const { data, setData, post, processing, errors } = useForm({
    id: (rowData == null ? void 0 : rowData.id) ? rowData == null ? void 0 : rowData.id : 0,
    name: rowData == null ? void 0 : rowData.name,
    color: (rowData == null ? void 0 : rowData.color) ? rowData == null ? void 0 : rowData.color : "#000000",
    type: (rowData == null ? void 0 : rowData.type) ? rowData == null ? void 0 : rowData.type : "listing_lead"
  });
  useEffect(() => {
    setTitle(props.title);
  }, []);
  const submit = () => {
    post("/admin/status/addAction", {
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
        router.get("/admin/status");
      }
    });
  };
  const handleCancel = () => {
    router.get("/admin/status");
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
              label: "Color",
              name: "color",
              validateStatus: errors.color && "error",
              help: errors.color,
              rules: [
                {
                  required: true,
                  message: "This field is required"
                }
              ],
              children: /* @__PURE__ */ jsx(
                Input,
                {
                  size: "large",
                  type: "color",
                  disabled: processing
                }
              )
            }
          ),
          /* @__PURE__ */ jsx(
            Form.Item,
            {
              label: "Type",
              name: "type",
              validateStatus: errors.type && "error",
              help: errors.type,
              rules: [
                {
                  required: true,
                  message: "This field is required"
                }
              ],
              children: /* @__PURE__ */ jsx(
                Select,
                {
                  options: [
                    {
                      value: "listing_lead",
                      label: "Listing / Lead"
                    },
                    {
                      value: "meeting",
                      label: "Meeting"
                    }
                  ]
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

import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { A as AgentLayout } from "./AgentLayout-55444b12.js";
import { usePage, useForm, Head, router } from "@inertiajs/react";
import { Card, Row, Col, Form, Input, Space, Button, message } from "antd";
/* empty css                */import "@ant-design/icons";
/* empty css                */const AddEdit = () => {
  const props = usePage().props;
  const rowData = props.row;
  const [title, setTitle] = useState("");
  const { data, setData, post, processing, errors } = useForm({
    id: (rowData == null ? void 0 : rowData.id) ? rowData == null ? void 0 : rowData.id : 0,
    name: rowData == null ? void 0 : rowData.name,
    email: rowData == null ? void 0 : rowData.email,
    mobile: rowData == null ? void 0 : rowData.mobile,
    nationality: rowData == null ? void 0 : rowData.nationality
  });
  useEffect(() => {
    setTitle(props.title);
  }, []);
  const submit = () => {
    post("/customer/addAction", {
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
        router.get("/customer");
      }
    });
  };
  const handleCancel = () => {
    router.get("/customer");
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
              label: "Customer Name",
              name: "name",
              validateStatus: errors.name && "error",
              help: errors.name,
              rules: [
                {
                  required: true,
                  message: "This field is required"
                }
              ],
              children: /* @__PURE__ */ jsx(Input, { disabled: processing })
            }
          ),
          /* @__PURE__ */ jsx(
            Form.Item,
            {
              label: "Email",
              name: "email",
              validateStatus: errors.email && "error",
              help: errors.email,
              rules: [
                {
                  required: true,
                  message: "This field is required"
                }
              ],
              children: /* @__PURE__ */ jsx(Input, { type: "email", disabled: processing })
            }
          ),
          /* @__PURE__ */ jsx(
            Form.Item,
            {
              label: "Mobile Ex: (+971 ...)",
              name: "mobile",
              validateStatus: errors.mobile && "error",
              help: errors.mobile,
              rules: [
                {
                  required: true,
                  message: "This field is required"
                }
              ],
              children: /* @__PURE__ */ jsx(Input, { disabled: processing })
            }
          ),
          /* @__PURE__ */ jsx(
            Form.Item,
            {
              label: "Nationality",
              name: "nationality",
              validateStatus: errors.nationality && "error",
              help: errors.nationality,
              rules: [
                {
                  required: true,
                  message: "This field is required"
                }
              ],
              children: /* @__PURE__ */ jsx(Input, { disabled: processing })
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

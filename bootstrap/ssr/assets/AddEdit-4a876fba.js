import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { A as AgentLayout } from "./AgentLayout-55444b12.js";
import { usePage, useForm, Head, router } from "@inertiajs/react";
import { Card, Row, Col, Form, Input, Space, Button, message } from "antd";
/* empty css                */import "@ant-design/icons";
/* empty css                */const AddEdit = () => {
  const props = usePage().props;
  const rowData = props.row;
  const pid = props.pid;
  const [title, setTitle] = useState("");
  const { data, setData, post, processing, errors, reset } = useForm({
    id: (rowData == null ? void 0 : rowData.id) ? rowData == null ? void 0 : rowData.id : 0,
    project_id: (rowData == null ? void 0 : rowData.project_id) ? rowData == null ? void 0 : rowData.project_id : pid,
    doc_type: rowData == null ? void 0 : rowData.doc_type,
    link: rowData == null ? void 0 : rowData.link
  });
  useEffect(() => {
    setTitle(props.title);
  }, []);
  const submit = () => {
    post("/project/doc/addAction", {
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
        router.get(`/project/doc?pid=${pid}`);
      }
    });
  };
  const handleCancel = () => {
    router.get(`/project/doc?pid=${pid}`);
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
              label: "Document Type",
              name: "doc_type",
              validateStatus: errors.doc_type && "error",
              help: errors.doc_type,
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
              label: "Link / URL",
              name: "link",
              validateStatus: errors.link && "error",
              help: errors.link,
              rules: [
                {
                  required: true,
                  message: "This field is required"
                }
              ],
              children: /* @__PURE__ */ jsx(Input, { type: "url", disabled: processing })
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

import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { A as AgentLayout } from "./AgentLayout-55444b12.js";
import { usePage, useForm, Head, router } from "@inertiajs/react";
import { Form, Card, Row, Col, Select, Input, Space, Button, message } from "antd";
/* empty css                */import "@ant-design/icons";
/* empty css                */const Import = () => {
  const [form] = Form.useForm();
  const props = usePage().props;
  const [title, setTitle] = useState("");
  const properties = props.properties;
  const locations = props.locations;
  const { data, setData, post, processing, errors } = useForm({
    location_id: "",
    property_id: "",
    filepath: "",
    upload_file: null
  });
  useEffect(() => {
    setTitle(props.title);
  }, []);
  const submit = () => {
    post("/leaser/importAction", {
      forceFormData: true,
      onSuccess: () => {
        message.success("Data Imported Successfully !");
      },
      onError: () => {
        message.error("There was an error processing your request. Please try again !");
        router.get("/leaser/import");
      },
      onFinish: () => {
        router.get(`/leaser/list?lid=${data.location_id}`);
      }
    });
  };
  const handleCancel = () => {
    router.get("/leaser");
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(Card, { bordered: false, style: { width: "100%", borderRadius: 0, paddingBottom: 20 }, children: [
    /* @__PURE__ */ jsx(Head, { title }),
    /* @__PURE__ */ jsx(Row, { justify: "space-between", align: "middle", style: { marginBottom: 20, marginTop: 5 }, children: /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx("span", { className: "page-title", children: title }) }) }),
    /* @__PURE__ */ jsx("div", { className: "form-holder", style: { width: "40%" }, children: /* @__PURE__ */ jsxs(
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
          ),
          /* @__PURE__ */ jsx(
            Form.Item,
            {
              label: "Select File to Import",
              name: "filepath",
              validateStatus: errors.filepath && "error",
              help: errors.filepath,
              rules: [
                {
                  required: true,
                  message: "This field is required"
                }
              ],
              children: /* @__PURE__ */ jsx(Input, { type: "file", accept: ".csv,.xls,.xlsx", onChange: (e) => setData("upload_file", e.target.files[0]) })
            }
          ),
          /* @__PURE__ */ jsx(Form.Item, { className: "form-actions", children: /* @__PURE__ */ jsxs(Space, { size: "middle", children: [
            /* @__PURE__ */ jsx(Button, { type: "primary", htmlType: "submit", loading: processing, size: "large", children: processing ? "Please Wait" : "Submit" }),
            /* @__PURE__ */ jsx(Button, { danger: true, size: "large", onClick: handleCancel, children: "Cancel" })
          ] }) }),
          /* @__PURE__ */ jsx("div", { style: { marginTop: 25, marginBottom: 0 }, children: /* @__PURE__ */ jsx("a", { href: "/sample-files/sample-leaser.xls", download: true, target: "_blank", children: "Download Sample File" }) })
        ]
      }
    ) })
  ] }) });
};
Import.layout = (page) => /* @__PURE__ */ jsx(AgentLayout, { children: page });
export {
  Import as default
};

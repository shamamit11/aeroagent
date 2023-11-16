import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { A as AdminLayout } from "./AdminLayout-d3b93070.js";
import { usePage, useForm, Head, router } from "@inertiajs/react";
import { Card, Row, Col, Form, Select, Input, Space, Button, message } from "antd";
/* empty css                */import "@ant-design/icons";
/* empty css                */import "./light-logo-3220573e.js";
const AddEdit = () => {
  const props = usePage().props;
  props.row;
  const [title, setTitle] = useState("");
  const { data, setData, post, processing, errors } = useForm({
    id: 0,
    profession: void 0,
    first_name: "",
    last_name: "",
    mobile: "",
    email: "",
    password: "",
    password_confirmation: ""
  });
  useEffect(() => {
    setTitle(props.title);
  }, []);
  const submit = () => {
    post("/admin/user/addAction", {
      onSuccess: () => {
        message.success("User Added Successfully !");
      },
      onError: () => {
        message.error("There was an error processing your request. Please try again !");
      },
      onFinish: () => {
        router.get("/admin/user");
      }
    });
  };
  const handleCancel = () => {
    router.get("/admin/user");
  };
  return /* @__PURE__ */ jsxs(Card, { bordered: false, style: { width: "100%", borderRadius: 0, paddingBottom: 20 }, children: [
    /* @__PURE__ */ jsx(Head, { title }),
    /* @__PURE__ */ jsx(Row, { justify: "space-between", align: "middle", children: /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx("span", { className: "page-title", children: title }) }) }),
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
              name: "profession",
              validateStatus: errors.profession && "error",
              help: errors.profession,
              rules: [
                {
                  required: true,
                  message: "Please select Profession!"
                }
              ],
              children: /* @__PURE__ */ jsx(
                Select,
                {
                  disabled: processing,
                  placeholder: "Select Your Profession",
                  options: [
                    {
                      value: "Real Estate Specialist",
                      label: "Real Estate Specialist"
                    },
                    {
                      value: "Affiliate",
                      label: "Affiliate Marketing"
                    }
                  ]
                }
              )
            }
          ),
          /* @__PURE__ */ jsxs(Row, { justify: "space-between", align: "middle", children: [
            /* @__PURE__ */ jsx(Col, { style: { width: "49%" }, children: /* @__PURE__ */ jsx(
              Form.Item,
              {
                label: "First Name",
                name: "first_name",
                validateStatus: errors.first_name && "error",
                help: errors.first_name,
                rules: [
                  {
                    required: true,
                    message: "Please input First Name!"
                  }
                ],
                children: /* @__PURE__ */ jsx(
                  Input,
                  {
                    disabled: processing
                  }
                )
              }
            ) }),
            /* @__PURE__ */ jsx(Col, { style: { width: "49%" }, children: /* @__PURE__ */ jsx(
              Form.Item,
              {
                label: "Last Name",
                name: "last_name",
                validateStatus: errors.last_name && "error",
                help: errors.last_name,
                rules: [
                  {
                    required: true,
                    message: "Please input Last Name!"
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
            /* @__PURE__ */ jsx(Col, { style: { width: "49%" }, children: /* @__PURE__ */ jsx(
              Form.Item,
              {
                label: "Mobile",
                name: "mobile",
                validateStatus: errors.mobile && "error",
                help: errors.mobile,
                rules: [
                  {
                    required: true,
                    message: "Please input Mobile No!"
                  }
                ],
                children: /* @__PURE__ */ jsx(
                  Input,
                  {
                    disabled: processing,
                    placeholder: "Ex: +97150XXXXXXX"
                  }
                )
              }
            ) }),
            /* @__PURE__ */ jsx(Col, { style: { width: "49%" }, children: /* @__PURE__ */ jsx(
              Form.Item,
              {
                label: "Email Address",
                name: "email",
                validateStatus: errors.email && "error",
                help: errors.email,
                rules: [
                  {
                    required: true,
                    message: "Please input E-mail!"
                  },
                  {
                    type: "email",
                    message: "Invalid E-mail"
                  },
                  {
                    max: 50,
                    message: "E-mail should not exceed 50 characters"
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
            /* @__PURE__ */ jsx(Col, { style: { width: "49%" }, children: /* @__PURE__ */ jsx(
              Form.Item,
              {
                label: "Password",
                name: "password",
                rules: [
                  {
                    required: true,
                    message: "Please input password!"
                  },
                  {
                    max: 50,
                    message: "Password should not exceed 50 characters"
                  }
                ],
                validateStatus: errors.password && "error",
                help: errors.password,
                children: /* @__PURE__ */ jsx(
                  Input,
                  {
                    disabled: processing,
                    autoComplete: "current-password"
                  }
                )
              }
            ) }),
            /* @__PURE__ */ jsx(Col, { style: { width: "49%" }, children: /* @__PURE__ */ jsx(
              Form.Item,
              {
                label: "Confirm Password",
                name: "password_confirmation",
                validateStatus: errors.password_confirmation && "error",
                help: errors.password_confirmation,
                rules: [
                  {
                    required: true,
                    message: "Please confirm Password!"
                  }
                ],
                children: /* @__PURE__ */ jsx(
                  Input,
                  {
                    disabled: processing,
                    autoComplete: "current-password"
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
AddEdit.layout = (page) => /* @__PURE__ */ jsx(AdminLayout, { children: page });
export {
  AddEdit as default
};

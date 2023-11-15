import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import "react";
import { useForm, router } from "@inertiajs/react";
import { Form, Input, Space, Button, message } from "antd";
/* empty css                */const SettingPassword = () => {
  const { data, setData, post, processing, errors } = useForm({
    old_password: "",
    new_password: "",
    confirm_password: ""
  });
  const submit = () => {
    post("/settings/updatePassword", {
      forceFormData: true,
      onSuccess: (e) => {
        console.log(e.props.error);
        if (e.props.error) {
          message.error(e.props.error);
        } else {
          message.success("Password Updated Successfully !");
        }
      },
      onError: (errors2) => {
        Object.entries(errors2).map(([key, value]) => message.error(value));
      },
      onFinish: () => {
        router.get("/dashboard");
        router.post("/logout");
      }
    });
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "form-holder", children: /* @__PURE__ */ jsxs(
    Form,
    {
      name: "passbasic",
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
            label: "Current Password",
            name: "old_password",
            validateStatus: errors.old_password && "error",
            help: errors.old_password,
            rules: [
              {
                required: true,
                message: "This field is required"
              }
            ],
            children: /* @__PURE__ */ jsx(
              Input.Password,
              {
                disabled: processing,
                autoComplete: "current-password"
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(
          Form.Item,
          {
            label: "New Password",
            name: "new_password",
            validateStatus: errors.new_password && "error",
            help: errors.new_password,
            rules: [
              {
                required: true,
                message: "This field is required"
              }
            ],
            children: /* @__PURE__ */ jsx(
              Input.Password,
              {
                disabled: processing,
                autoComplete: "current-password"
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(
          Form.Item,
          {
            label: "Confirm Password",
            name: "confirm_password",
            validateStatus: errors.confirm_password && "error",
            help: errors.confirm_password,
            rules: [
              {
                required: true,
                message: "This field is required"
              }
            ],
            children: /* @__PURE__ */ jsx(
              Input.Password,
              {
                disabled: processing,
                autoComplete: "current-password"
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(Form.Item, { className: "form-actions", children: /* @__PURE__ */ jsx(Space, { size: "middle", children: /* @__PURE__ */ jsx(Button, { type: "primary", htmlType: "submit", loading: processing, size: "large", children: processing ? "Please Wait" : "Update" }) }) })
      ]
    }
  ) }) });
};
export {
  SettingPassword as default
};

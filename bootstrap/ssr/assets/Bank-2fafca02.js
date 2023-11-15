import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import "react";
import { usePage, useForm, router } from "@inertiajs/react";
import { Form, Input, Space, Button, message } from "antd";
/* empty css                */const SettingBank = () => {
  const props = usePage().props;
  const rowData = props.bank;
  console.log(rowData);
  const { data, setData, post, processing, errors } = useForm({
    bank_name: rowData == null ? void 0 : rowData.bank_name,
    account_name: rowData == null ? void 0 : rowData.account_name,
    account_no: rowData == null ? void 0 : rowData.account_no,
    iban: rowData == null ? void 0 : rowData.iban
  });
  const submit = () => {
    post("/settings/updateBank", {
      forceFormData: true,
      onSuccess: () => {
        message.success("Bank Updated Successfully !");
      },
      onError: () => {
        message.error("There was an error processing your request. Please try again !");
      },
      onFinish: () => {
        router.get("/settings");
      }
    });
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "form-holder", children: /* @__PURE__ */ jsxs(
    Form,
    {
      name: "bankbasic",
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
            label: "Bank Name",
            name: "bank_name",
            validateStatus: errors.bank_name && "error",
            help: errors.bank_name,
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
            label: "Account Name",
            name: "account_name",
            validateStatus: errors.account_name && "error",
            help: errors.account_name,
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
            label: "Account Number",
            name: "account_no",
            validateStatus: errors.account_no && "error",
            help: errors.account_no,
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
            label: "IBAN",
            name: "iban",
            validateStatus: errors.iban && "error",
            help: errors.iban,
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
        /* @__PURE__ */ jsx(Form.Item, { className: "form-actions", children: /* @__PURE__ */ jsx(Space, { size: "middle", children: /* @__PURE__ */ jsx(Button, { type: "primary", htmlType: "submit", loading: processing, size: "large", children: processing ? "Please Wait" : "Update" }) }) })
      ]
    }
  ) }) });
};
export {
  SettingBank as default
};

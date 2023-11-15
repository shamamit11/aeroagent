import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { usePage, useForm, router } from "@inertiajs/react";
import { Form, Input, Space, Avatar, Divider, Button, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
/* empty css                */const SettingProfile = () => {
  const props = usePage().props;
  const rowData = props.profile;
  const [profileImage, setProfileImage] = useState("");
  const { data, setData, post, processing, errors } = useForm({
    first_name: rowData == null ? void 0 : rowData.first_name,
    last_name: rowData == null ? void 0 : rowData.last_name,
    upload_image: ""
  });
  useEffect(() => {
  }, []);
  const updateImage = (img) => {
    const imgUrl = URL.createObjectURL(img);
    setProfileImage(imgUrl);
    setData("upload_image", img);
  };
  const submit = () => {
    post("/admin/settings/updateProfile", {
      forceFormData: true,
      onSuccess: () => {
        message.success("Profile Updated Successfully !");
      },
      onError: () => {
        message.error("There was an error processing your request. Please try again !");
      },
      onFinish: () => {
        router.get("/admin/settings");
      }
    });
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "form-holder", children: /* @__PURE__ */ jsxs(
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
      encType: "multipart/form-data",
      children: [
        /* @__PURE__ */ jsx(
          Form.Item,
          {
            label: "First Name",
            name: "first_name",
            validateStatus: errors.first_name && "error",
            help: errors.first_name,
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
            label: "Last Name",
            name: "last_name",
            validateStatus: errors.last_name && "error",
            help: errors.last_name,
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
            label: "Select Profile Image | Dimension: (150px X 150px) | Max Size: 200Kb",
            name: "upload_image",
            validateStatus: errors.upload_image && "error",
            help: errors.upload_image,
            children: /* @__PURE__ */ jsx(Input, { type: "file", accept: ".png,.jpg,.jpeg", onChange: (e) => updateImage(e.target.files[0]) })
          }
        ),
        !rowData.image && !profileImage && /* @__PURE__ */ jsx(Space, { wrap: true, size: 16, children: /* @__PURE__ */ jsx(Avatar, { shape: "square", size: 80, icon: /* @__PURE__ */ jsx(UserOutlined, {}) }) }),
        rowData.image && !profileImage && /* @__PURE__ */ jsx(Space, { wrap: true, size: 16, children: /* @__PURE__ */ jsx(Avatar, { shape: "square", size: 80, src: rowData == null ? void 0 : rowData.image_path }) }),
        profileImage && /* @__PURE__ */ jsx(Space, { wrap: true, size: 16, children: /* @__PURE__ */ jsx(Avatar, { shape: "square", size: 80, src: profileImage }) }),
        /* @__PURE__ */ jsx(Divider, {}),
        /* @__PURE__ */ jsx(Form.Item, { className: "form-actions", children: /* @__PURE__ */ jsx(Space, { size: "middle", children: /* @__PURE__ */ jsx(Button, { type: "primary", htmlType: "submit", loading: processing, size: "large", children: processing ? "Please Wait" : "Update" }) }) })
      ]
    }
  ) }) });
};
export {
  SettingProfile as default
};

import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import "react";
import { usePage } from "@inertiajs/react";
/* empty css                */const TabInfo = () => {
  const props = usePage().props;
  const rowData = props.row;
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("table", { className: "table", children: /* @__PURE__ */ jsxs("tbody", { children: [
    /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("th", { width: "20%", align: "left", children: "Name" }),
      /* @__PURE__ */ jsx("td", { width: "80%", align: "left", children: rowData.name })
    ] }),
    /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("th", { width: "20%", align: "left", children: "Developer" }),
      /* @__PURE__ */ jsx("td", { width: "80%", align: "left", children: rowData.developer.name })
    ] }),
    /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("th", { width: "20%", align: "left", children: "Location" }),
      /* @__PURE__ */ jsx("td", { width: "80%", align: "left", children: rowData.location.name })
    ] }),
    /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("th", { width: "20%", align: "left", children: "View Style" }),
      /* @__PURE__ */ jsx("td", { width: "80%", align: "left", children: rowData.views })
    ] }),
    /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("th", { width: "20%", align: "left", children: "Commission" }),
      /* @__PURE__ */ jsxs("td", { width: "80%", align: "left", children: [
        rowData.commission,
        " %"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("th", { width: "20%", align: "left", children: "Handover Date" }),
      /* @__PURE__ */ jsx("td", { width: "80%", align: "left", children: rowData.handover_date })
    ] }),
    /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("th", { width: "20%", align: "left", children: "Project Status" }),
      /* @__PURE__ */ jsx("td", { width: "80%", align: "left", children: rowData.status })
    ] }),
    /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("th", { width: "20%", align: "left", children: "Amenities" }),
      /* @__PURE__ */ jsx("td", { width: "80%", align: "left", children: rowData.amenities })
    ] })
  ] }) }) }) });
};
export {
  TabInfo as default
};

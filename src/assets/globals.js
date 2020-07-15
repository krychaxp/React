import React from "react";
import Github from "../components/Github.js";
import Forms from "../components/Forms.js";
import Charts from "../components/Charts.js";
import Images from "../components/Images.js";
import Table from "../components/Table.js";
window.localStorage.lang = window.localStorage.lang || "en";
export const lang = window.localStorage.lang;
export const globals = {
  routes: [
    {
      path: "/github",
      title: "Github",
      component: <Github />,
    },
    {
      path: "/forms",
      title: "Forms",
      component: <Forms />,
    },
    {
      path: "/charts",
      title: "Charts",
      component: <Charts />,
    },
    {
      path: "/images",
      title: "Images",
      component: <Images />,
    },
    {
      path: "/table",
      title: "Table",
      component: <Table />,
    },
  ],
};
// export default (props) => globals[props].map((v) => setValue(v));

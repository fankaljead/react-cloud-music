import React from "react";
// import { Navigate } from "react-router-dom";
import Home from "../application/Home";
import Recommend from "../application/Recommend";
import Singers from "../application/Singers";
import Rank from "../application/Rank";
import { Redirect } from "react-router-dom";

const routes = [
  {
    path: "/",
    component: Home,
    routes: [
      {
        path: "/",
        exact: true,
        // render: () =><Route render={()=><Redirect to={"/recommend"} />} />,
        render: () => <Redirect to={"/recommend"} />,
      },
      {
        path: "/recommend",
        component: Recommend,
      },
      {
        path: "/singers",
        component: Singers,
      },
      {
        path: "/rank",
        component: Rank,
      },
    ],
  },
];

export default routes;

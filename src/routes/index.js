import React from "react";
// import { Navigate } from "react-router-dom";
import Home from "../application/Home";
import Recommend from "../application/Recommend";
import Singers from "../application/Singers";
import Rank from "../application/Rank";
import { Redirect } from "react-router-dom";
import Album from "../application/Album";
import Singer from "../application/Singer";

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
        routes: [
          {
            path: "/recommend/:id",
            component: Album,
          },
        ],
      },
      {
        path: "/singers",
        component: Singers,
        key: "singers",
        routes: [
          {
            path: "/singers/:id",
            component: Singer,
          },
        ],
      },
      {
        path: "/rank",
        component: Rank,
        key: "rank",
        routes: [
          {
            path: "/rank/:id",
            component: Album,
          },
        ],
      },
    ],
  },
];

export default routes;

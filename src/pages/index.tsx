import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { useState } from "react";

import Layout from "../features/layouts/Layout";
import Dashboard from "./dashboard";
import Login from "./login";
import Transactions from "./transactions";
import Users from "./users";

const privateRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/dashboard" />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/transactions",
        element: <Transactions />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

const publicRouter = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <Navigate to="/login" />,
  },
]);

export default function Routes() {
  const [token] = useState(localStorage.getItem("token"));
  return <RouterProvider router={token ? privateRouter : publicRouter} />;
}

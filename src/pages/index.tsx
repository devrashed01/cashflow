import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { useAuthContext } from "../context/AuthContext";
import Layout from "../features/layouts/Layout";
import Category from "./category";
import Dashboard from "./dashboard";
import Login from "./login";
import Transactions from "./transactions";

const privateRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "category",
        element: <Category />,
      },
      {
        path: "transactions",
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
  const { token } = useAuthContext();
  return <RouterProvider router={token ? privateRouter : publicRouter} />;
}

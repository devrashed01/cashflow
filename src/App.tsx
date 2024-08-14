import { QueryClientProvider } from "@tanstack/react-query";
import { App, ConfigProvider } from "antd";
import React from "react";

import queryClient from "./config/queryClient.config";
import { TransactionProvider } from "./context/TransactionContext";
import { UserProvider } from "./context/UserContext";
import Routes from "./pages";
import themeConfig from "./theme/config";

const MyApp: React.FC = () => (
  <ConfigProvider theme={themeConfig}>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <TransactionProvider>
          <App>
            <Routes />
          </App>
        </TransactionProvider>
      </UserProvider>
    </QueryClientProvider>
  </ConfigProvider>
);

export default MyApp;

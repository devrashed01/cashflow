import { QueryClientProvider } from "@tanstack/react-query";
import { App, ConfigProvider } from "antd";
import React from "react";

import queryClient from "./config/queryClient.config";
import { AuthProvider } from "./context/AuthContext";
import Routes from "./pages";
import themeConfig from "./theme/config";

const MyApp: React.FC = () => (
  <ConfigProvider theme={themeConfig}>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App>
          <Routes />
        </App>
      </AuthProvider>
    </QueryClientProvider>
  </ConfigProvider>
);

export default MyApp;

import {
  BankOutlined,
  BoxPlotOutlined,
  HomeOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import type { MenuProps } from "antd";
import { Layout, Menu, Popconfirm, Spin } from "antd";
import React, { useState } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import { getProfile } from "../../actions/auth";
import { useAuthContext } from "../../context/AuthContext";

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  href: string,
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label: <Link to={href}>{label}</Link>,
    href,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("/dashboard", "Dashboard", "1", <HomeOutlined />),
  getItem("/category", "Category", "2", <BoxPlotOutlined />),
  getItem("/transactions", "Transactions", "3", <BankOutlined />),
];

const App: React.FC = () => {
  const location = useLocation();
  const { logout } = useAuthContext();
  const [collapsed, setCollapsed] = useState(true);
  const selectedKey = items.find((el: any) =>
    window.location.pathname.includes(el.href)
  )?.key;

  const { isLoading, data } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  if (isLoading) {
    return (
      <WindowCenter>
        <Spin size="large" />
      </WindowCenter>
    );
  }

  if (!data) {
    logout();
    return <Navigate to="/" state={location} />;
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Popconfirm title="Are you confirm to logout ?" onConfirm={logout}>
          <Logo>
            <LogoutOutlined />
          </Logo>
        </Popconfirm>
        <Menu
          theme="light"
          defaultSelectedKeys={[selectedKey as string]}
          mode="inline"
          items={items}
        />
      </Sider>
      <MainLayout>
        <StyledContent>
          <Outlet />
        </StyledContent>
      </MainLayout>
    </Layout>
  );
};

export const Logo = styled.div`
  cursor: pointer;
  text-align: center;
  padding: 10px;

  &:hover {
    background: ${({ theme }) => theme.colorSecondary};
  }
`;

export const StyledContent = styled(Content)`
  margin: 16px;
`;

export const MainLayout = styled(Layout)`
  background: #fff;
`;

export default App;

export const WindowCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

import {
  HomeOutlined,
  TransactionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

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
  getItem("/users", "Users", "2", <UserOutlined />),
  getItem("/transactions", "Transactions", "3", <TransactionOutlined />),
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  const selectedKey = items.find((el: any) =>
    window.location.pathname.includes(el.href)
  )?.key;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Logo>
          <img style={{ width: "60px" }} src="logo.svg" alt="logo" />
        </Logo>
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
  color: #000;
  font-weight: 600;
  text-align: center;
  padding: 10px;
`;

export const StyledContent = styled(Content)`
  margin: 16px;
`;

export const MainLayout = styled(Layout)`
  background: #fff;
`;

export default App;

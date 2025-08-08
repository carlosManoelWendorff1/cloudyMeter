import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Breadcrumb, Layout, Menu } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import AppRoutes from "./routes/AppRoutes";
import MenuItem from "antd/es/menu/MenuItem";
import { BrowserRouter, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Header style={{ display: "flex", alignItems: "center" }}>
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            style={{ flex: 1, minWidth: 0 }}
          >
            <MenuItem>
              <Link to="/dashboard">Dashboard Temperatura</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/dashboardHum">Dashboard Humidade</Link>
            </MenuItem>
          </Menu>
        </Header>
        <Content style={{ padding: "2rem 2rem 2rem 2rem" }}>
          <div
            style={{
              backgroundColor: "white",
              minHeight: 280,
              padding: 24,
              height: "86vh",
            }}
          >
            <AppRoutes />
          </div>
        </Content>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

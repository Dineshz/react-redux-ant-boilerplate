import React from "react";
import {Layout, notification} from "antd";
import Navbar from "./Navbar.react";
import Routes from "./Routes";
import ErrorHandler from "./ErrorHandler.react";
const {Header, Content} = Layout;

class MainLayout extends React.Component {

  componentDidMount() {
    notification.config({
      placement: "topRight",
      duration: 4,
    });
  }

  render () {
      return (
        <div>
          <Layout className="layout">
            <Header className="navbar">
              <Navbar/>
            </Header>
            <Content className="content">
              <div className="area">
                <ErrorHandler>
                  <Routes/>
                </ErrorHandler>
              </div>
            </Content>
          </Layout>
        </div>
      );
  }
}

export default MainLayout;

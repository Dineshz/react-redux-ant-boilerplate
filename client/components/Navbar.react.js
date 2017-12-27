import React from "react";
import {Link} from "react-router-dom";
import {Row, Col, Menu, Dropdown} from "antd";

class Navbar extends React.Component {

  populateMenu = () => {
    return (
      <Menu mode="horizontal" className="header-menu"
        defaultSelectedKeys={["/"]}>
        <Menu.Item key="/">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="/page1">
          <Link to="/page1">Page 1</Link>
        </Menu.Item>
        <Menu.Item key="/page2">
          <Link to="/page2">Page 2</Link>
        </Menu.Item>
      </Menu>
    );
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={3}>
            <div className="logo">
              <Link to="/">
                <h3>Logo</h3>
              </Link>
            </div>
          </Col>
          <Col span={10}>
            {this.populateMenu()}
          </Col>
        </Row>
      </div>
    );
  }
}

export default Navbar;

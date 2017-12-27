import React, {Component} from "react";
import NoData from "./NoData.react";
import {notification} from "antd";

class Home extends Component {

  componentWillReceiveProps(nextProps) {
    const {data} = nextProps;
    if(data) notification.success({
      message: data,
      description: ""
    })
  }

  componentDidMount() {
    const {sayHi} = this.props
    if(sayHi) sayHi();
  }

  render() {
    return (
      <NoData text="Hello World!" icon="smile-o" />
    );
  }

}

export default Home;

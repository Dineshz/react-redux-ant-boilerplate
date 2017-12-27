import React, {Component} from "react";
import NoData from "./NoData.react";

class NotFound extends Component {

  render() {
    return (
      <NoData text="Page not found!"
        icon="exclamation-circle-o" />
    );
  }
}


export default NotFound;

import React, {Component} from "react";
import NoData from "./NoData.react";

class ErrorHandler extends Component {
  constructor() {
    super();
    this.state = {
      hasError: false
    };
  }

  componentDidCatch(error, info) {
    this.setState({hasError: true});
  }

  render() {
    const {children} = this.props;
    const {hasError} = this.state;
    if(hasError) return (
      <NoData text="Oops! Something went wrong." icon="frown-o"/>
    );
    return children;
  }

}

export default ErrorHandler;

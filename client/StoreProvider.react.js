import React, {Component} from "react";
import {BrowserRouter as Router} from "react-router-dom";
import configureStore from "./configureStore/configureStore";
import {Provider} from "react-redux";
import MainLayoutContainer from "./containers/MainLayoutContainer";

// STYLES
import "antd/dist/antd.less";
import "./assets/scss/importer.scss";

// Creating Store
const store = configureStore();

class StoreProvider extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router>
          <MainLayoutContainer/>
        </Router>
      </Provider>
    );
  }

}

export default StoreProvider;

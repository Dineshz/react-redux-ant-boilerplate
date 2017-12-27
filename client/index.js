import React from "react";
import ReactDOM from "react-dom";
import {AppContainer} from "react-hot-loader";
import StoreProvider from "./StoreProvider.react";

const render = Component => {
  ReactDOM.render(
    <AppContainer warnings={false}>
      <Component />
    </AppContainer>,
    document.getElementById("root")
  );
};

render(StoreProvider);

// Enable Hot Module Replacement
if (module.hot) {
  module.hot.accept("./StoreProvider.react", () => {
    const NextApp = require("./StoreProvider.react").default;
    render(NextApp);
  });
}

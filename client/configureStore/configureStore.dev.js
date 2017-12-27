import {createStore, applyMiddleware, compose} from "redux";
import {createLogger} from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "../reducers/rootReducer";

const loggerOptions = {
  collapsed: true,
};

/**
 * configureStore - Store Configurations with initial State
 * @param  {Object} preloadedState Preloaded Initial State of Application
 * @middleware - Axios API Middleware and Action Logger
 */
const configureStore = preloadedState => {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      // Always Put Logger at the last
      applyMiddleware(thunk, createLogger(loggerOptions))
    )
  );

  // Enable Webpack hot module replacement for reducers
  if (module.hot) {
    module.hot.accept("../reducers/rootReducer", () => {
      const nextRootReducer = require("../reducers/rootReducer").default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;

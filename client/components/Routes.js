import {Route, Switch, Redirect} from "react-router-dom";
import React from "react";
//Components
import HomeContainer from "../containers/HomeContainer";
import NotFound from "./NotFound.react";

class Routes extends React.Component{

  render() {
    const {PrivateRoute} = this;
    return (
      <Switch>
        <Route exact path="/" component={HomeContainer}/>
        <Route component={NotFound} />
      </Switch>
    );
  }
};

export default Routes;

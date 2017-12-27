import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import MainLayout from "../components/MainLayout.react";

/**
 * mapStateToProps - To Map State parameters to Components
 * @param  {Object} state - Entire state object
 * @param  {Objects} ownProps - Other Properties passed to Component
 * @return {Object} - Props to be passed to Component
 */
const mapStateToProps = () => ({
  //
});

/**
 * mapDispatchToProps - To Map Dispatcher to Components
 * @param  {Object} dispatch - Action dispatcher
 * @return {Object} - Props to be passed to Component
 */
const mapDispatchToProps = (dispatch) => ({
  //
});

/**
 * MainLayoutContainer - Connecting State and Dispatcher to Component
 */
const MainLayoutContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(MainLayout));

export default MainLayoutContainer;

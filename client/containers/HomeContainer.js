import {connect} from "react-redux";
import Home from "../components/Home.react";
import {sayHi} from "../actions/WelcomeActions";

/**
 * mapStateToProps - To Map State parameters to Components
 * @param  {Object} state - Entire state object
 * @param  {Objects} ownProps - Other Properties passed to Component
 * @return {Object} - Props to be passed to Component
 */
const mapStateToProps = ({data}) => ({
  data,
});

/**
 * mapDispatchToProps - To Map Dispatcher to Components
 * @param  {Object} dispatch - Action dispatcher
 * @return {Object} - Props to be passed to Component
 */
const mapDispatchToProps = (dispatch, getState) => ({
  sayHi: () => dispatch(sayHi()),
});

/**
 * HomeContainer - Connecting State and Dispatcher to Component
 */
const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export default HomeContainer;

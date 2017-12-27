import {combineReducers} from "redux";
import {WelcomeActionTypes} from "../actions/ActionTypes";

const data = (state="", action) => {
  switch(action.type) {
    case WelcomeActionTypes.SAY_HI:
      return "Hi! Welcome to Antdesign";
    default:
      return state;
  }
}

/**
 * rootReducer - To combine all other reducers
 */
const rootReducer = combineReducers({
  data,
});

export default rootReducer;

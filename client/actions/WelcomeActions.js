import {WelcomeActionTypes} from "./ActionTypes";

export const sayHi = () => dispatch => {
  setTimeout(() => dispatch({
    type: WelcomeActionTypes.SAY_HI
  }), 3000)
}

import {API} from "../utils/constants";
// import {applyTemplate} from "../utils/stringUtils";
import api from "axios";
const {options} = API;

const BoardApi = {

  getAllBoards(){
    return api.get(API.GET_ALL_BOARDS, options);
  },

};

export default BoardApi;

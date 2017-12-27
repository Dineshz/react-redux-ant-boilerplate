import keyMirror from "keymirror";
const API_URL = "/api";
const url = (url) => API_URL + url;

// NUMERIC CONSTANTS
export const NUMBERS = {
    ZERO: 0,
    NEG_ONE: -1,
    ONE: 1,
    TWO: 2,
    FIVE: 5,
    HUNDRED: 100,
    THOUSAND: 1000
};

export const NOT_EXISTS = NUMBERS.NEG_ONE;

// API ENDPOINTS
export const API = {
  options: {withCredentials: true},
};

export const NOTIFICATION_TYPE = {
  ERROR: "error",
  SUCCESS: "success",
  INFO: "info",
  WARNING: "warning",
};

export const STATUS = keyMirror({
  SUCCESS: null,
  ERROR: null,
  INPROGRESS: null,
});

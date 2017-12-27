import {NUMBERS} from "./constants";
import {fromNow} from "./dateUtils";

/**
 * applyTemplate - Replaces smart Tags in string with values from object
 * @param  {String} text - String to be processed
 * @param  {Object} object - Object with parameters to be replaced
 * @return {String} - String with tags replaced with respective values
 */
export const applyTemplate = (text, object) => {
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      text = text.replace("{"+key+"}", object[key]);
    }
  }
  return text;
};

export const dateFromNow = (date) => date.isValid && date.isValid() &&
  `${date.format("Do MMMM")}\n(${fromNow(date)})`;

export const capitalize = (value) => (value+"").toLowerCase().split(" ")
  .map((word) =>
    word.charAt(NUMBERS.ZERO).toUpperCase() + word.slice(NUMBERS.ONE))
  .join(" ");

export const firstChars = (string="") => string
  .split(" ").map((word) => word[0]).join("");

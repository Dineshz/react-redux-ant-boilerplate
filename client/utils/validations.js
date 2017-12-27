import validator from "validator";
import {NUMBERS, WORKSPACE} from "./constants";
import {capitalize} from "./stringUtils";
const {VALIDATION_STATUS} = WORKSPACE;
const {SUCCESS, ERROR, NONE} = VALIDATION_STATUS;

const SPACE = " ";
const LOWERCASE_CHARSET = "abcdefghijklmnopqrstuvwxyz";
const UPPERCASE_CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const CHARSET = LOWERCASE_CHARSET + UPPERCASE_CHARSET;
const NUMBERSET = "0123456789";

const autofixField = {
  "first_name": capitalize,
  "middle_name": capitalize,
  "last_name": capitalize,
  "company_name": capitalize,
  "email": (value) => (value+"").toLowerCase(),
  "phone": ({number, countryCode}) => {
    let existingCountryCode = number ? number.match(/^\(+(.*)\)/gm) : "";
    if(existingCountryCode)
      existingCountryCode = existingCountryCode[0].replace(/[\(\)+]/g, "");
    else existingCountryCode = "";
    countryCode = countryCode ? countryCode : existingCountryCode;
    let autofixedValue = (number ? number+"" : "")
      .replace(/\(+.*\)/g, "")
      .replace(/[\(\) \-+]/g, "");
    if(countryCode) autofixedValue = `(+${countryCode})${autofixedValue}`;
    return autofixedValue;
  },
  "person_phone": ({number, countryCode}) => {
    let existingCountryCode = number ? number.match(/^\(+(.*)\)/gm) : "";
    if(existingCountryCode)
      existingCountryCode = existingCountryCode[0].replace(/[\(\)+]/g, "");
    else existingCountryCode = "";
    countryCode = countryCode ? countryCode : existingCountryCode;
    let autofixedValue = (number ? number+"" : "")
      .replace(/\(+.*\)/g, "")
      .replace(/[\(\) \-+]/g, "");
    if(countryCode) autofixedValue = `(+${countryCode})${autofixedValue}`;
    return autofixedValue;
  },
};

const basicValidation = {
  "first_name": (value) => validator.isWhitelisted(value+"", CHARSET+SPACE),
  "middle_name": (value) => validator.isWhitelisted(value+"", CHARSET+SPACE),
  "last_name": (value) => validator.isWhitelisted(value+"", CHARSET+SPACE),
  "domain": (value) => validator.isWhitelisted(
    (value+"").toLowerCase(), NUMBERSET + LOWERCASE_CHARSET + "-."
  ),
  "company_website": (value) => validator.isWhitelisted(
    (value+"").toLowerCase(), NUMBERSET + LOWERCASE_CHARSET + "-./:"
  ),
  "company_linkedin_url":(value)=>validator.contains(value+"", "linkedin.com/"),
  "person_linkedin_url":(value)=> validator.contains(value+"", "linkedin.com/"),
  "email": (value) => validator.isEmail(value+""),
  "founded_year": (value) => {
      const year = parseInt(value);
      if(year && year <= new Date().getFullYear())
        return true;
      return false;
  },
  "phone": (value="") => {
    let phone = (value+"").replace(/\(+.*\)/g, "");
    return validator.isWhitelisted(phone+"", NUMBERSET);
  },
  "person_phone": (value="") => {
    let phone = (value+"").replace(/\(+.*\)/g, "");
    return validator.isWhitelisted(phone+"", NUMBERSET);
  },
};

const emailPatterns = ({first_name="", last_name="", domain=""}) => {
  let emailPatterns = [];
  let firstName = first_name.replace(/ /g, "");
  let lastName = last_name.replace(/ /g, "");
  if(domain) {
    if(firstName)
    emailPatterns = emailPatterns.concat([
      `${firstName}@${domain}`,
    ]);
    if(lastName)
      emailPatterns = emailPatterns.concat([
        `${lastName}@${domain}`,
      ]);
    if(firstName && lastName)
      emailPatterns = emailPatterns.concat([
        `${firstName[0]}${lastName}@${domain}`,
        `${firstName}${lastName}@${domain}`,
        `${firstName}.${lastName}@${domain}`,
        `${firstName[0]}.${lastName}@${domain}`,
        `${firstName}${lastName[0]}@${domain}`,
        `${firstName}.${lastName[0]}@${domain}`,
        `${firstName[0]}.${lastName[0]}@${domain}`,
        `${firstName[0]}${lastName[0]}@${domain}`,
        `${firstName}_${lastName}@${domain}`,
        `${firstName[0]}_${lastName}@${domain}`
      ]);
  }
  return emailPatterns;
};

const warningValidation = {
  "first_name": (value="", {last_name="", middle_name=""}) => (
    middle_name.toLowerCase().indexOf(value.toLowerCase())>=NUMBERS.ZERO ||
    last_name.toLowerCase().indexOf(value.toLowerCase())>=NUMBERS.ZERO ||
    false
  ),
  "middle_name": (value="", {last_name="", first_name=""}) => (
    first_name.toLowerCase().indexOf(value.toLowerCase())>=NUMBERS.ZERO ||
    last_name.toLowerCase().indexOf(value.toLowerCase())>=NUMBERS.ZERO ||
    false
  ),
  "last_name": (value="", {first_name="", middle_name=""}) => (
    first_name.toLowerCase().indexOf(value.toLowerCase())>=NUMBERS.ZERO ||
    middle_name.toLowerCase().indexOf(value.toLowerCase())>=NUMBERS.ZERO ||
    false
  ),
  "company_website": (value="", {domain=""}) => (
    value.toLowerCase().indexOf(domain.toLowerCase()) === NUMBERS.NEG_ONE
  ),
  "email": (email="", {first_name="", last_name="", domain=""}) => {
    let emails = emailPatterns({
      "first_name": first_name.toLowerCase(),
      "last_name": last_name.toLowerCase(),
      "domain": domain.toLowerCase(),
    });
    if(emails.indexOf(email) !== NUMBERS.NEG_ONE) return false;
    return true;
  },
  "founded_year": (value) => {
    const MIN_YEAR = 1900;
    if(!isNaN(value)) return parseInt(value) <= MIN_YEAR;
    return false;
  },
};

export const autofix = (field, value) => {
  if(autofixField[field]) return autofixField[field](value);
  return value;
};

const basicValidationMessage = {
  "first_name": "Only characters are allowed",
  "middle_name": "Only characters are allowed",
  "last_name": "Only characters are allowed",
  "domain": "Only hyphen(-) and dot(.) are allowed",
  "company_website": "Should be a proper website address",
  "company_linkedin_url": "Not a valid linkedin url",
  "person_linkedin_url": "Not a valid linkedin url",
  "email": "Not a valid email",
  "founded_year": "Not a valid year",
  "phone": "Not a valid phone number",
  "person_phone": "Not a valid phone number",
};

const warnings = {
  "first_name": "First name, middle name or last name looks similar",
  "middle_name": "First name, middle name or last name looks similar",
  "last_name": "First name, middle name or last name looks similar",
  "company_website": "Company website and domain look different",
  "email": "Email does not match any of the patterns",
  "founded_year": "Year might not be correct",
};

const validationMessage = (field, messages) => messages[field] || "";

const hasWarning = (field, value, allFields=[]) => {
  if(warningValidation[field]) {
    let fieldObj = {};
    fieldObj = combineFields(allFields);
    return warningValidation[field](value, fieldObj);
  }
  return false;
};

export const validate = (field, value, allFields) => {
  let validation = {
    isValid: false,
    hasWarning: false,
    status: NONE,
    message: "",
    warning: "",
  };
  if(value && basicValidation[field]) {
    validation.isValid = basicValidation[field](value);
    if(validation.isValid) {
      validation.status = SUCCESS;
      validation.hasWarning = hasWarning(field, value, allFields);
      if(validation.hasWarning)
        validation.warning = validationMessage(field, warnings);
    } else {
      validation.status = ERROR;
      validation.message = validationMessage(field, basicValidationMessage);
    }
  }
  return validation;
};

export const combineFields = (allFields=[]) => allFields.slice().reduce(
  (parent, field) => (
    {
      ...parent,
      [field.name]: field.value !== null ? field.value : "",
    }
  ), {});

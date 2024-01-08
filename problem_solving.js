/**
 * Object to validate
 */
let object = {
  title: "Prepare document", //String
  duration: 8, //Number
  plannedFrom: "2024-01-04T06:03:34.915+00:00", //Date
  plannedTo: "2024-01-04T06:03:34.915+00:00", //Date
  stakeholders: ["personA", "personB", "personC"], //Array
  status: {
    //Object
    workItem: "Task", //String
    status: "Approved", //String
    category: "Completed", // String
    mailTrigger: true, // Boolean,
  },
  active: true, // Boolean
};

/**
 * Check whether given input is string
 * @param {any} value Input value to check
 * @param {string} key Field key to use for message
 * @returns {boolean} boolean mentioning whether given input is string
 */
const is_string = (value, key) => {
  const res = typeof value === "string";
  if (!res)
    console.log(
      `Error: ${key} should be of datatype String but it was ${typeof value}`
    );
  return res;
};

/**
 * Check whether given input is boolean
 * @param {any} value Input value to check
 * @param {string} key Field key to use for message
 * @returns {boolean} boolean mentioning whether given input is boolean
 */
const is_boolean = (value, key) => {
  const res = typeof value === "boolean";
  if (!res)
    console.log(
      `Error: ${key} should be of datatype Boolean but it was ${typeof value} `
    );
  return res;
};

/**
 * Check whether given input is number
 * @param {any} value Input value to check
 * @param {string} key Field key to use for message
 * @returns {boolean} boolean mentioning whether given input is number
 */
const is_number = (value, key) => {
  const res = typeof value === "number";
  if (!res)
    console.log(
      `Error: ${key} should be of datatype Number but it was ${typeof value} `
    );
  return res;
};

/**
 * Check whether given input is date
 * @param {any} value Input value to check
 * @param {string} key Field key to use for message
 * @returns {boolean} boolean mentioning whether given input is date or date string
 */
const is_date = (value, key) => {
  if (value instanceof Date) {
    return true;
  }
  if (is_string(value, key)) {
    if (!isNaN(Date.parse(value))) {
      return true;
    }
  }
  console.log(
    `Error: ${key} should be of datatype Date but it was ${typeof value} `
  );
  return false;
};

/**
 * Check whether given input is status object
 * @param {any} value Input value to check
 * @param {string} key Field key to use for message
 * @returns {boolean} boolean mentioning whether given input is status object
 */
const is_status_object = (value, _) => {
  if (typeof value === "object" && value !== null) {
    /**
     * Finding difference between keys in passed value and expected_status object to
     * find out keys that shouldn't be present in the value
     */
    const unknown_keys = Object.keys(value).filter(
      (key) => !Object.keys(expected_status).includes(key)
    );

    if (unknown_keys.length > 0) {
      console.log(`Error: status field has unknown field: ${unknown_keys}`);
      return false;
    }

    /**
     * Loop through expected_status fields and verify if present in value and is of required type
     */
    for (const key in expected_status) {
      if (!value.hasOwnProperty(key)) {
        console.log(`Error: ${key} in status field is missing`);
      }
      const field_value = value[key];
      const validator_func = expected_status[key];
      if (!validator_func(field_value, `${key} in status field`)) {
        return false;
      }
    }

    return true;
  }
  return false;
};

/**
 * This dictionary is used as reference template to match against input object.
 * dictionary has a format of
 *  key - field name
 *  value - function reference which is used to validate the field value,
 *    function is of format (value, key) => boolean
 */
const expected_object = {
  title: is_string,
  duration: is_number,
  plannedFrom: is_date,
  plannedTo: is_date,
  stakeholders: Array.isArray,
  status: is_status_object,
  active: is_boolean,
};

/**
 * This is dictionary is used as template for status object, format is similar to expected_object
 */
const expected_status = {
  workItem: is_string,
  status: is_string,
  category: is_string,
  mailTrigger: is_boolean,
};

/**
 * Finding difference between keys in object and expected_object to
 * find out keys that shouldn't be present in the object
 */
const unknown_keys = Object.keys(object).filter(
  (key) => !Object.keys(expected_object).includes(key)
);

/**
 * If the length of unknown_keys is greater than zero it means there are unexpected keys in object
 * displaying error and exiting code
 */
if (unknown_keys.length > 0) {
  console.log(`Error: unknown field in object: ${unknown_keys}`);
  process.exit(1);
}

/**
 * Looping through keys in expected_object and check if the key is present in object and
 * validate if the field is of required type
 */
for (const key in expected_object) {
  /**
   * check if the key is prsent in object, else show error and exit
   */
  if (!object.hasOwnProperty(key)) {
    console.log(`Error: ${key} not present`);
    process.exit(1);
  }
  const value = object[key];
  const validator_func = expected_object[key];
  if (!validator_func(value, key)) {
    /**
     * validator function already shows the error, exiting code as value is not expected type
     */
    process.exit(1);
  }
}

console.log("Object is valid");

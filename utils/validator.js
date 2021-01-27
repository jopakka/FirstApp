// adapted from function validate() in https://medium.com/@pavsidhu/validating-forms-in-react-native-7adc625c49cf
import validate from 'validate.js';

const validator = (field, value, constraints) => {
  let object = {};
  if (typeof value === 'string') {
    object[field] = value;
  } else {
    object = value;
  }

  const constraint = constraints[field];
  const result = validate(object, {[field]: constraint});
  if (result) {
    return result[field][0];
  }
  return null;
};

const constraints = {
  email: {
    presence: {
      message: 'Please enter an email address',
    },
    email: {
      message: 'Please enter a valid email address',
    },
  },
  password: {
    presence: {
      message: 'Please enter a password',
    },
    length: {
      minimum: 5,
      message: 'Your password must be at least 5 characters',
    },
  },
  username: {
    presence: {
      message: 'Please enter a username',
    },
    length: {
      minimum: 3,
      message: 'Your username must be at least 3 characters',
    },
  },
};

export {validator, constraints};
